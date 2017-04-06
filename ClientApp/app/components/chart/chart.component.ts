import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as d3 from 'd3';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'bootstrap';
import { TreeModalComponent } from '../modal/modal.component';
import { TreeNode } from "./tree-node";
import { TreeNodeService } from './tree-node.service';
import { Project } from '../projectlist/project';

export type DataType = { x: any, y: any };

@Component({
    selector: 'chart',
    encapsulation: ViewEncapsulation.None,
    template: require('./chart.component.html'),
    styles: [require('./chart.component.css')],
    providers: [TreeNodeService]
})

export class ChartComponent implements OnInit, OnDestroy {

    projectId: number;
    projectTitle: string;
    private sub: any;
    treeHasLoaded: boolean;
    //Add Child Component
    @ViewChild(TreeModalComponent) myChild: TreeModalComponent;

    // Initialize the component
    ngOnInit(): void {
        this.treeHasLoaded = false;
        this.sub = this.route.params.subscribe(params => {
            this.projectId = +params['id'];
        this.getTreeData();
        }); // (+) converts string 'id' to a number
    };

    ngOnDestroy() {
        this.sub.unsubscribe();
    };

    // Get the data for the tree
    getTreeData(): void {
        let insertData = {};
        this.treeNodeService.getTreeNodes(this.projectId).subscribe(data => {
            insertData = data[0];
            this.projectTitle = data[0].projectTitle;
            this.initTree({ id: "#canvas", data: insertData });
            this.treeHasLoaded = true;
        });        
    };

    // Refresh button without having to use the browser button
    refresh() {
        $('#refreshGlyph').addClass('glyphicon-refresh-animate');
        let updateData = {};
        this.treeNodeService.getTreeNodes(this.projectId).subscribe(data => {
            updateData = data[0];
            this.projectTitle = data[0].projectTitle;

            this.performTreeRefresh(updateData);
            this.treeHasLoaded = true;
        });

        $('#refreshGlyph').removeClass('glyphicon-refresh-animate');
    };

    /*
        Two online D3 examples were used to lay the foundation for this ChartComponent class.
        The organization chart look was referenced from the following github page
            https://github.com/BernhardZuba/d3js-orgchart/blob/master/index.htm

        The drag and drop behavior was referenced from the following block page
            http://bl.ocks.org/robschmuecker/7880033
    */

    private lastInteractedNode: TreeNode = null;

    private root: TreeNode = null;
    // variable for getting all the nodes at any one time
    private nodes: any = null;
    // this is the nodes identity in the html
    private domNode: any = null;
    // The node to be inserted into
    private selectedNode: any = null;
    // The node being dragged
    private draggingNode: any = null;
    private dragStarted = false;

    // used for assigning an id to each node in the html
    private counter = 0;
    // the svg canvas itself
    private baseSvg: any = null;
    // the group of nodes in the svg canvas
    private svgGroup: any = null;
    // the tree data structure
    private tree: any = null;
    // function used to calculate awesome perpendicular lines between nodes
    private lineFunction: any = null;
    // function in charge of zoom behavior
    private zoomListener: any = null;
    // function in charge of drag behavior
    private dragListener: any = null;

    /* Configuration */
    private duration = 750;            // Duration of the animations in milliseconds
    private panSpeed = 200;            // Pan speed in milliseconds
    private panTimer: any;             
    private panBoundary = 20;          // no panning within 20 pixels of the canvas boundaries
    private viewerWidth = 0;           // canvas width
    private viewerHeight = 0;          // canvas height
    private rectW = 400;               // Width of nodes
    private rectH = 150;               // Height of nodes
    private rectSpacing = 20;          // Spacing between nodes horizontally
    private fixedDepth = 80;           // Spacing between nodes vertically

    constructor(private treeNodeService: TreeNodeService, private route: ActivatedRoute, private router: Router) {}

    // This function takes two nodes and compares their titles to return which comes first lexically.
    sortTree() {
        this.tree.sort(function (a: any, b: any) {
            return (b.issueTitle.toLowerCase() < a.issueTitle.toLowerCase()) ? 1 : -1;
        });
    };

    // This function moves the internal view
    pan(domNode: any, direction: string) {
        let speed = this.panSpeed;
        let translateX: number;
        let translateY: number;

        if (this.panTimer) {
            clearTimeout(this.panTimer);
            let translateCoords = d3.transform(this.svgGroup.attr("transform"));
            if (direction == 'left' || direction == 'right') {
                translateX = (direction == 'left') ? translateCoords.translate[0] + speed : translateCoords.translate[0] - speed;
                translateY = translateCoords.translate[1];
            } else if (direction == 'up' || direction == 'down') {
                translateX = translateCoords.translate[0];
                translateY = (direction == 'up') ? translateCoords.translate[1] + speed : translateCoords.translate[1] - speed;
            }
            let scaleX = translateCoords.scale[0];
            let scaleY = translateCoords.scale[1];
            let scale = this.zoomListener.scale();
            this.svgGroup.transition().attr("transform", "translate(" + translateX + "," + translateY + ")scale(" + scale + ")");
            d3.select(domNode).select('g.node').attr("transform", "translate(" + translateX + "," + translateY + ")");
            this.zoomListener.scale(this.zoomListener.scale());
            this.zoomListener.translate([translateX, translateY]);
            this.panTimer = setTimeout(() => {
                this.pan(domNode, direction);
            }, 50);
        }
    };

    // Move the svgGroup according to the mouse event
    zoom(): (d: any, i: any) => void {
        return (d, i) => {
            this.svgGroup.attr("transform", "translate(" + (<any>d3.event).translate + ")scale(" + (<any>d3.event).scale + ")");
        }
    };

    // This function kicks off the drag event
    initiateDrag(d: any, domNode: any) {
        this.draggingNode = d;

        d3.select(domNode)
            .select('.ghostCircle')
            .attr('pointer-events', 'none');

        d3.selectAll('.ghostCircle')
            .attr('class', 'ghostCircle show');

        d3.select(domNode)
            .attr('class', 'node activeDrag');

        this.svgGroup.selectAll("g.node").sort( (a: any, b: any) => { // select the parent and sort the path's
            if (a.id != this.draggingNode.id) return 1; // a is not the hovered element, send "a" to the back
            else return -1; // a is the hovered element, bring "a" to the front
        });
        // if nodes has children, remove the links and nodes
        if (this.nodes.length > 1) {
            // remove link paths
            let links = this.tree.links(this.nodes);
            let nodePaths = this.svgGroup.selectAll("path.link")
                .data(links, function (d: any) {
                    return d.target.id;
                }).remove();
            // remove child nodes
            let nodesExit = this.svgGroup.selectAll("g.node")
                .data(this.nodes, function (d: any) {
                    return d.id;
                }).filter((d: any, i: any) => {
                    if (d.id == this.draggingNode.id) {
                        return false;
                    }
                    return true;
                }).remove();
        }

        // remove parent link
        let parentLink = this.tree.links(this.tree.nodes(this.draggingNode.parent));
        this.svgGroup.selectAll('path.link').filter((d:any, i: any) => {
            if (d.target.id == this.draggingNode.id) {
                return true;
            }
            return false;
        }).remove();

        this.dragStarted = null;
    };

    // This function performs clean up actions at end of drag event
    endDrag() {
        this.selectedNode = null;
        d3.selectAll('.ghostCircle').attr('class', 'ghostCircle');
        d3.select(this.domNode).attr('class', 'node');
        // now restore the mouseover event or we won't be able to drag a 2nd time
        d3.select(this.domNode).select('.ghostCircle').attr('pointer-events', '');
        this.updateTempConnector();
        if (this.draggingNode !== null) {
            this.update(this.draggingNode);
            this.centerNode(this.draggingNode);

            this.lastInteractedNode = this.draggingNode;

            this.draggingNode = null;
        }
    };

    // This function collapses the nodes in the tree
    collapse(d: TreeNode) {
        if (d.children) {
            d.tempChildren = d.children;
            d.tempChildren.forEach(this.collapse);
            d.children = null;
        }
    };

    // This function expands the nodes in the tree
    expand(d: TreeNode) {
        if (d.tempChildren) {
            d.children = d.tempChildren;
            d.children.forEach(this.expand);
            d.tempChildren = null;
        }
    };

    // This function recenters a node in the canvas
    centerNode(source: TreeNode) {
        let scale = this.zoomListener.scale();
        let x = -source.x0;
        let y = -source.y0;
        x = x * scale + ((this.viewerWidth / 2) - this.rectW / 2);
        y = y * scale + this.viewerHeight / 4;
        d3.select('g').transition()
            .duration(this.duration)
            .attr("transform", "translate(" + x + "," + y + ")scale(" + scale + ")");
        this.zoomListener.scale(scale);
        this.zoomListener.translate([x, y]);
    };

    // This function shifts the children and tempChildren for the expand/collapse functions
    toggleChildren(d: any) {

        if (d.children) {
            d.tempChildren = d.children;
            d.children = null;
            // Toggles the collapse caret
            $("#Node" + d.issueId).removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
        } else if (d.tempChildren) {
            d.children = d.tempChildren;
            d.tempChildren = null;
            // Toggles the collapse caret
            $("#Node" + d.issueId).removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
        }
        return d;
    };

    // This function handles the click event on nodes
    click(): (d: any) => void {
        return (d) => {
            if ((<any>d3.event).defaultPrevented) {
                // click suppressed
                return;
            }

            d = this.toggleChildren(d);
            this.update(d);
            this.centerNode(d);
        }
    };

    // This function handles the beginning actions of a drag event
    dragStart() {
        return (d: any) => {
            if (d == this.root) {
                return;
            }
            this.dragStarted = true;
            this.nodes = this.tree.nodes(d);

            // It's important that we suppress the mouseover event on the node being dragged. 
            // Otherwise it will absorb the mouseover event and the underlying node will not detect it 
            (<any>d3.event).sourceEvent.stopPropagation();
        }
    };

    // This function handles the actions during a drag event
    drag() {
        // We have to be able to touch two different scopes which is why the self variable 
        // is assigned here to refer to the ChartComponent class. We enter the following function where the 
        // keyword this now refers to the html element being interacted with in the DOM.
        let self = this;

        return function (d: any) {

            // No dragging the root!
            if (d == self.root) {
                return;
            }

            if (self.dragStarted) {
                self.domNode = this;
                self.initiateDrag(d, self.domNode);
            }

            // get coords of mouseEvent relative to svg container to allow for panning
            let relCoords = d3.mouse($('svg').get(0));
            if (relCoords[0] < self.panBoundary) {
                self.panTimer = true;
                self.pan(this, 'left');
            } else if (relCoords[0] > ($('svg').width() - self.panBoundary)) {
                self.panTimer = true;
                self.pan(this, 'right');
            } else if (relCoords[1] < self.panBoundary) {
                self.panTimer = true;
                self.pan(this, 'up');
            } else if (relCoords[1] > ($('svg').height() - self.panBoundary)) {
                self.panTimer = true;
                self.pan(this, 'down');
            } else {
                try {
                    clearTimeout(self.panTimer);
                } catch (e) {
                    // What should we do with this exception?
                }
            }

            d.x0 += (<any>d3.event).dx;
            d.y0 += (<any>d3.event).dy;
            let node = d3.select(this);
            // This is what actually drags the html element across the screen
            node.attr("transform", "translate(" + d.x0 + "," + d.y0 + ")");

            self.updateTempConnector();
        }
    };

    // This function handles the end actions of a drag event
    dragFinish() {
        // We have to be able to touch two different scopes which is why the self variable 
        // is assigned here to refer to the class. We enter the following function where the 
        // keyword this now refers to the html element being interacted with in the DOM.
        let self = this;

        return function (d: any) {

            // Again, no dragging the root!
            if (d == self.root) {
                return;
            }

            self.domNode = this;

            // This block of code does the insert of the dragged node into a node that it is drop onto.
            if (self.selectedNode) {
                // now remove the element from the parent, and insert it into the new elements children
                let index = self.draggingNode.parent.children.indexOf(self.draggingNode);
                if (index > -1) {
                    self.draggingNode.parent.children.splice(index, 1);
                }
                if (typeof self.selectedNode.children !== 'undefined' || typeof self.selectedNode.tempChildren !== 'undefined') {
                    if (typeof self.selectedNode.children !== 'undefined') {
                        self.selectedNode.children.push(self.draggingNode);
                    } else {
                        self.selectedNode.tempChildren.push(self.draggingNode);
                    }
                } else {
                    self.selectedNode.children = [];
                    self.selectedNode.children.push(self.draggingNode);
                }
                self.myChild.reparent(self.draggingNode.issueId, self.selectedNode.issueId);
                // Make sure that the node being added to is expanded so user can see added node is correctly moved
                self.expand(self.selectedNode);
                self.sortTree();

                self.endDrag();

             

            }
            // If the node is dropped into white space then it doesn't get inserted into anything and
            // subsequently returns to its last location.
            else {
                self.endDrag();
            }
        }
    };

    // Prepares node for valid drop area
    overCircle(d: any) {
        this.selectedNode = d;
        this.updateTempConnector();
    };

    // Cleans up state after drop event
    outCircle(d: any) {
        this.selectedNode = null;
        this.updateTempConnector();
    };

    // Handles drawing the line showing which node a node will be dropped into
    updateTempConnector() {
        let data: any[] = [];

        if (this.draggingNode !== null && this.selectedNode !== null) {
            data = [{
                source: {
                    x: this.selectedNode.x0 + this.rectW / 2,
                    y: this.selectedNode.y0 + this.rectH / 2
                },
                target: {
                    x: this.draggingNode.x0 + this.rectW / 2,
                    y: this.draggingNode.y0 + this.rectH / 2
                }
            }];
        }

        let link = this.svgGroup.selectAll(".templink").data(data);

        link.enter().append("path")
            .attr("class", "templink")
            .attr("d", d3.svg.diagonal())
            .attr('pointer-events', 'none');

        link.attr("d", d3.svg.diagonal());

        link.exit().remove();
    };

    // This function draws the tree
    update(source: TreeNode): void {

        // Compute the new tree layout.
        this.nodes = this.tree.nodes(this.root).reverse();

        let links = this.tree.links(this.nodes);

        // Normalize for fixed-depth.
        this.nodes.forEach((d: any) => (d.y = d.depth * this.fixedDepth * 3));

        // Retrieve or assign an id for each node in the html
        let node = this.svgGroup.selectAll("g.node")
            .data(this.nodes, (d: any) => {
                return d.id || (d.id = ++this.counter)
            });

        // Enter any new nodes at the parent's previous position.
        let nodeEnter = node.enter().append("g")
            .call(this.dragListener)
            .attr("class", "node")
            .attr("transform", function (d: any) {
                return "translate(" + source.x0 + "," + source.y0 + ")";
            });

        // Begin adding fields to the node
        // Color the nodes based on the node color property
        nodeEnter.append("rect")
            .attr("width", this.rectW)
            .attr("height", this.rectH)
            .attr("fill", function (d: any) {
                return d.statusCatColor;
            });

        // Add tooltip div to page
        let div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // adds image to node
        nodeEnter.append("image")
            .attr("xlink:href", function (d: any) {
                return d.userAvatarPath;
            })
            .attr("x", "-25px")
            .attr("y", "25px")
            .attr("width", this.rectW / 2 + "px")
            .attr("height", this.rectH / 1.5 + "px")
            .on("mouseover", function (d: any) { // Adds tooltip for assignee name on image
                div.transition()
                    .duration(200)
                    .style("opacity", 1);
                div.html("Username: " + d.userName)
                    .style("left", ((<any>d3.event).pageX) + "px")
                    .style("top", ((<any>d3.event).pageY - 28) + "px");
            })
            .on("mouseout", function (d: any) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // adds title label to the node
        nodeEnter.append("text")
            .attr("x", (this.rectW / 2) - 50)
            .attr("y", this.rectH / 5)
            .style("text-anchor", "start")
            .text(function (d: any) {
                return "Title:";
            });

        // adds title to the node
        nodeEnter.append("text")
            .attr("x", this.rectW / 2)
            .attr("y", this.rectH / 5)
            .style("text-anchor", "start")
            .text(function (d: any) {
                if (d.issueTitle.length > 25) {
                    let trimmed = d.issueTitle.substring(0, 20) + "...";
                    return trimmed;
                }
                else {
                    return d.issueTitle;
                }
            }).on("mouseover", function (d: any) { // Adds tooltip for issue titles
                div.transition()
                    .duration(200)
                    .style("opacity", 1);
                div.html("Priority: " + d.issueTitle)
                    .style("left", ((<any>d3.event).pageX) + "px")
                    .style("top", ((<any>d3.event).pageY - 28) + "px");
            })
            .on("mouseout", function (d: any) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // adds node id label to the node
        nodeEnter.append("text")
            .attr("x", (this.rectW / 2) - 50)
            .attr("y", this.rectH * 3 / 5)
            .style("text-anchor", "start")
            .text(function (d: any) {
                return "Id:";
            });

        // adds node id to the node
        nodeEnter.append("text")
            .attr("x", this.rectW / 2)
            .attr("y", this.rectH * 3 / 5)
            .style("text-anchor", "start")
            .text(function (d: any) {
                return d.issueId;
            });

        // adds priority image to the node
        nodeEnter.append("image")
            .attr("xlink:href", function (d: any) {
                //using require so webpack adds images to wwwroot during compilation
                return require('../../assets/icons/priority/' + d.priorityImage);
            })
            .attr("x", this.rectW / 3)
            .attr("y", this.rectH / 1.5)
            .attr("width", "25px")
            .attr("height", "25px")
            .on("mouseover", function (d: any) { // Adds tooltip for assignee name on image
                div.transition()
                    .duration(200)
                    .style("opacity", 1);
                div.html("Priority: " + d.priorityName)
                    .style("left", ((<any>d3.event).pageX) + "px")
                    .style("top", ((<any>d3.event).pageY - 28) + "px");
            })
            .on("mouseout", function (d: any) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // adds status image to the node
        nodeEnter.append("image")
            .attr("xlink:href", function (d: any) {
                //using require so webpack adds images to wwwroot during compilation
                return require('../../assets/icons/status/' + d.statusImage);
            })
            .attr("x", this.rectW / 3 + 30)
            .attr("y", this.rectH / 1.5)
            .attr("width", "25px")
            .attr("height", "25px")
            .on("mouseover", function (d: any) { // Adds tooltip for assignee name on image
                div.transition()
                    .duration(200)
                    .style("opacity", 1);
                div.html("Status: " + d.statusName)
                    .style("left", ((<any>d3.event).pageX) + "px")
                    .style("top", ((<any>d3.event).pageY - 28) + "px");
            })
            .on("mouseout", function (d: any) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // adds type image to the node
        nodeEnter.append("image")
            .attr("xlink:href", function (d: any) {
                //using require so webpack adds images to wwwroot during compilation
                return require('../../assets/icons/issueTypes/' + d.typeImage);
            })
            .attr("x", this.rectW / 3 + 60)
            .attr("y", this.rectH / 1.5)
            .attr("width", "25px")
            .attr("height", "25px")
            .on("mouseover", function (d: any) { // Adds tooltip for assignee name on image
                div.transition()
                    .duration(200)
                    .style("opacity", 1);
                div.html("Type: " + d.typeName)
                    .style("left", ((<any>d3.event).pageX) + "px")
                    .style("top", ((<any>d3.event).pageY - 28) + "px");
            })
            .on("mouseout", function (d: any) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // adds edit button to the node
        nodeEnter.append("svg:foreignObject")
            //.attr("width", 25)
            //.attr("height", 20)
            .attr("y", this.rectH - 145)
            .attr("x", this.rectW - 22)
            .append("xhtml:div")
            //.attr("class", "btn btn-secondary btn-xs")
            //.attr("type", "button")
            //.text("Edit ")
            .on('click', (data: any) => {
                this.myChild.edit(data.issueId);
                //you should had imported 'Router' from '@angular/router'
                //this.router.navigate(['modalTest']);
            })
            .append("xhtml:span")
            .attr("class", 'control glyphicon glyphicon-pencil');

        // Add the expand/collapse icon to the node
        nodeEnter.append("svg:foreignObject")
            .attr("width", 50)
            .attr("height", 20)
            .attr("y", this.rectH - 20)
            .attr("x", this.rectW / 2 - 7)
            .append("xhtml:span")
            .attr("id", (data: any) => { return "Node" + data.issueId; })
            .attr("class", (data: any) => {
                if (data.tempChildren === undefined && data.children === undefined) {
                    return "";
                }
                else {
                    if (data.children !== undefined && data.children !== null && data.children.length > 0) {
                        return "control glyphicon glyphicon-menu-up";
                    }
                    else if (data.tempChildren !== undefined && data.tempChildren !== null && data.tempChildren.length > 0) {
                        return "control glyphicon glyphicon-menu-down";
                    }
                    else {
                        return "";
                    }
                }
            }).on("click", this.click());
            
        // adds create button to the node
        nodeEnter.append("svg:foreignObject")
            //.attr("width", 20)
            //.attr("height", 20)
            .attr("y", this.rectH - 145)
            .attr("x", this.rectW - 42)
            .append("xhtml:div")
            .on('click', (data: any) => {
                this.myChild.createChild(data.issueId, data.projectId);
            })
            .append("xhtml:span")
            .attr("class", 'control glyphicon glyphicon-plus');

        // End adding fields to node

        // Add circle showing drop area for nodes
        nodeEnter.append("circle")
            .attr('class', 'ghostCircle')
            .attr("cx", this.rectW / 2)
            .attr("cy", this.rectH / 2)
            .attr("r", this.rectW / 4)
            .attr("opacity", 0.2) // change this to zero to hide the target area
            .style("fill", "red")
            .attr('pointer-events', 'mouseover')
            .on("mouseover", (d: any) => {
                this.overCircle(d);
            })
            .on("mouseout", (d: any) => {
                this.outCircle(d);
            });

        // Transition nodes to their new position.
        let nodeUpdate = node.transition()
            .duration(this.duration)
            .attr("transform", function (d:any) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        // Transition exiting nodes to the parent's new position.
        let nodeExit = node.exit().transition()
            .duration(this.duration)
            .attr("transform", function (d:any) {
                return "translate(" + source.x + "," + source.y + ")";
            })
            .remove();

        // Update the links
        let link = this.svgGroup.selectAll("path.link")
            .data(links, function (d:any) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", (d:any) => {
                let u_line = ((d:any) => {
                    let u_linedata = [{ "x": d.source.x0 + (this.rectW / 2), "y": d.source.y0 + this.rectH + 2 },
                        { "x": d.source.x0 + (this.rectW / 2), "y": d.source.y0 + this.rectH + 2 },
                        { "x": d.source.x0 + (this.rectW / 2), "y": d.source.y0 + this.rectH + 2 },
                        { "x": d.source.x0 + (this.rectW / 2), "y": d.source.y0 + this.rectH + 2 }];
                    return u_linedata;
                })(d);
                return this.lineFunction(u_line);
            });

        // Transition links to their new position. 
        link.transition()
            .duration(this.duration)
            .attr("d", (d:any) => {
                let u_line = ((d:any) => {
                    let u_linedata = [{ "x": d.source.x + (this.rectW / 2), "y": d.source.y + this.rectH },
                        { "x": d.source.x + (this.rectW / 2), "y": d.target.y - 10 },
                        { "x": d.target.x + (this.rectW / 2), "y": d.target.y - 10 },
                        { "x": d.target.x + (this.rectW / 2), "y": d.target.y }];
                    return u_linedata;
                })(d);
                return this.lineFunction(u_line);
            });

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(this.duration)
            .attr("d", (d: any) => {
                /* This is needed to draw the lines right back to the caller */
                let u_line = ((d: any) => {
                    let u_linedata = [{ "x": d.source.x + (this.rectW / 2), "y": d.source.y + this.rectH + 2 },
                        { "x": d.source.x + (this.rectW / 2), "y": d.source.y + this.rectH + 2 },
                        { "x": d.source.x + (this.rectW / 2), "y": d.source.y + this.rectH + 2 },
                        { "x": d.source.x + (this.rectW / 2), "y": d.source.y + this.rectH + 2 }];
                    return u_linedata;
                })(d);
                return this.lineFunction(u_line);
            }).remove();

        // Stash the old positions for transition.
        this.nodes.forEach(function (d:any) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    };

    // Set up the tree for the first time
    initTree(options: any): void {
        let u_opts = $.extend({ id: "", data: {} }, options);
        let id = u_opts.id;
        this.root = u_opts.data;

        // size of the diagram
        this.viewerWidth = $(id).width();
        this.viewerHeight = $(id).height();

        // Set node dimensions for tree
        this.tree = d3.layout.tree().nodeSize([this.rectW + this.rectSpacing, this.rectH + this.rectSpacing]);

        /* Basic setup for the line function. */
        this.lineFunction = d3.svg.line<DataType>()
            .x(function (d: any) { return d.x; })
            .y(function (d: any) { return d.y; })
            .interpolate("linear");

        // Sort the tree initially incase the JSON isn't in a sorted order.
        this.sortTree();

        // define the zoomListener which calls the zoom function on the "zoom" event constrained within the scaleExtents
        this.zoomListener = d3.behavior.zoom().scaleExtent([0.1, 3]).on("zoom", this.zoom());

        // Set up the svg element on the page
        this.baseSvg = d3.select(id)
            .append("svg")
            .attr("width", this.viewerWidth)
            .attr("height", this.viewerHeight)
            .call(this.zoomListener);

        // Define the drag listener for drag/drop behavior of nodes.
        this.dragListener = d3.behavior.drag()
            .on("dragstart", this.dragStart())
            .on("drag", this.drag())
            .on("dragend", this.dragFinish());

        // create a group for the nodes on the svg element
        this.svgGroup = this.baseSvg.append("g");            

        // Set initial position of root
        this.root.x0 = (this.viewerWidth / 2) - this.rectW / 2;
        this.root.y0 = this.viewerHeight / 4;

        this.update(this.root);
        this.centerNode(this.root);
    };

    // Refresh tree after initialization
    performTreeRefresh(updateData: any): void {

        // Assign data to root
        this.root = updateData;

        // Set position of root
        this.root.x0 = (this.viewerWidth / 2) - this.rectW / 2;
        this.root.y0 = this.viewerHeight / 4;

        this.update(this.root);
        this.centerNode(this.lastInteractedNode);
    };
}