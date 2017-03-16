import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import * as d3 from 'd3';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'bootstrap';
import { TreeModalComponent } from '../Modal/modal.component';
import { TreeNode } from "./tree-node";
import { TreeNodeService } from './tree-node.service';
import { Project } from '../projectlist/project';


export type DataType = { x: any, y: any }

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
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    // Get the data for the tree
    getTreeData(): void {
        let insertData = {};
        this.treeNodeService.getTreeNodes(this.projectId).subscribe(data => {
            insertData = data[0];
            this.projectTitle = data[0].projectTitle;
            this.initTree({ id: "#canvas", data: insertData, modus: "line" });
            this.treeHasLoaded = true;
        });        
    }

    refresh() {
        let updatedData = {};
        this.treeNodeService.getTreeNodes(this.projectId).subscribe(data => {
            updatedData = data[0];
            this.initTree({
                id: "#canvas", data: updatedData, modus: "line"
            });    
        });
    }

    // The starter code for this script was obtained from
    // https://github.com/BernhardZuba/d3js-orgchart
    // The MIT License (MIT)

    private _margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    };
    private _root: TreeNode = null;
    private _nodes:any = [];
    private _counter = 0;
    private _svgroot:any = null;
    private _svg:any = null;
    private _tree:any = null;
    private _lineFunction:any = null;

    /* Configuration */
    private _duration = 750;            /* Duration of the animations */
    private _rectW = 400;               /* Width of the rectangle */
    private _rectH = 150;               /* Height of the rectangle */
    private _rectSpacing = 20;          /* Spacing between the rectangles */
    private _fixedDepth = 80;           /* Height of the line for child nodes */
    private _mode = "line";             /* Choose the values "line" or "diagonal" */
    private _callerNode:any = null;
    private _callerMode = 0;

    constructor(private treeNodeService: TreeNodeService, private route: ActivatedRoute, private router: Router) {}


    // This function collapses the nodes in the tree
    collapse(d: TreeNode): void {
        if (d.children) {
            d.tempChildren = d.children;
            for (let i = 0; i < d.tempChildren.length; i++) {
                this.collapse(d.tempChildren[i]);
            }
            d.children = null;
        }
    };

    // This function rebuilds the tree
    update(source: TreeNode): void {

        // Compute the new tree layout.
        this._nodes = this._tree.nodes(this._root).reverse();
        let links = this._tree.links(this._nodes);

        // Normalize for fixed-depth.
        this._nodes.forEach((d: any) => (d.y = d.depth * this._fixedDepth * 3));

        // Update the nodes
        let node = this._svg.selectAll("g.node")
            .data(this._nodes, (d: any) => {
                return d.id || (d.id = ++this._counter)
            });

        // Enter any new nodes at the parent's previous position.
        let nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d: any) {
                return "translate(" + source.x0 + "," + source.y0 + ")";
            })
        // .on("click", this.nodeClick());

        // Color the nodes based on the node color property
        nodeEnter.append("rect")
            .attr("width", this._rectW)
            .attr("height", this._rectH)
            .attr("fill", function (d: any) {
                return d.statusCatColor;
            });

        nodeEnter.append("rect")
            .attr("width", this._rectW)
            .attr("height", this._rectH)
            .attr("id", function (d: any) {
                return d.issueId;
            })
            .style("cursor", function (d: any) { "pointer"; })
            .attr("class", "box");

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
            .attr("width", this._rectW / 2 + "px")
            .attr("height", this._rectH / 1.5 + "px")
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
            .attr("x", (this._rectW / 2) - 50)
            .attr("y", this._rectH / 5)
            .style("text-anchor", "start")
            .text(function (d: any) {
                return "Title:";
            });

        // adds title to the node
        nodeEnter.append("text")
            .attr("x", this._rectW / 2)
            .attr("y", this._rectH / 5)
            .style("text-anchor", "start")
            .text(function (d: any) {
                return d.issueTitle;
            });


        // adds node id label to the node
        nodeEnter.append("text")
            .attr("x", (this._rectW / 2) - 50)
            .attr("y", this._rectH * 3 / 5)
            .style("text-anchor", "start")
            .text(function (d: any) {
                return "Id:";
            });

        // adds node id to the node
        nodeEnter.append("text")
            .attr("x", this._rectW / 2)
            .attr("y", this._rectH * 3 / 5)
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
            .attr("x", this._rectW / 3)
            .attr("y", this._rectH / 1.5)
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
            .attr("x", this._rectW / 3 + 30)
            .attr("y", this._rectH / 1.5)
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
            .attr("x", this._rectW / 3 + 60)
            .attr("y", this._rectH / 1.5)
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
            .attr("y", this._rectH - 145)
            .attr("x", this._rectW - 22)
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

        nodeEnter.append("svg:foreignObject")
            .attr("width", 50)
            .attr("height", 20)
            .attr("y", this._rectH - 20)
            .attr("x", this._rectW / 2 - 7)
            .append("xhtml:span")
            .attr("id", (data: any) => { return "Node" + data.issueId; })
            .attr("class", (data: any) => {
                if (data.tempChildren != null) {
                 return  data.tempChildren.length != 0 ? "control glyphicon glyphicon-menu-up" : "";
                }
                if (data.children != null) {
                    return data.children.length != 0 ? "control glyphicon glyphicon-menu-up" : "";
                }
            })
            .on("click", this.nodeClick());
            
        // adds create button to the node
        nodeEnter.append("svg:foreignObject")
            //.attr("width", 20)
            //.attr("height", 20)
            .attr("y", this._rectH - 145)
            .attr("x", this._rectW - 42)
            .append("xhtml:div")
            .on('click', (data: any) => {
                this.myChild.createChild(data.issueId, data.projectId);
            })
            .append("xhtml:span")
            .attr("class", 'control glyphicon glyphicon-plus');

        // Transition nodes to their new position.
        let nodeUpdate = node.transition()
            .duration(this._duration)
            .attr("transform", function (d:any) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        nodeUpdate.select("rect.box")
            .attr("fill", function (d:any) {
                return (d.children || d._children || d.hasChild) ? "url(#gradientchilds)" : "url(#gradientnochilds)";
            });
        // Transition exiting nodes to the parent's new position.
        let nodeExit = node.exit().transition()
            .duration(this._duration)
            .attr("transform", function (d:any) {
                return "translate(" + source.x + "," + source.y + ")";
            })
            .remove();

        // Update the links
        let link = this._svg.selectAll("path.link")
            .data(links, function (d:any) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().append("path", "g")
            .attr("class", "link")
            .attr("d", (d:any) => {
                let u_line = ((d:any) => {
                    let u_linedata = [{ "x": d.source.x0 + (this._rectW / 2), "y": d.source.y0 + this._rectH + 2 },
                        { "x": d.source.x0 + (this._rectW / 2), "y": d.source.y0 + this._rectH + 2 },
                        { "x": d.source.x0 + (this._rectW / 2), "y": d.source.y0 + this._rectH + 2 },
                        { "x": d.source.x0 + (this._rectW / 2), "y": d.source.y0 + this._rectH + 2 }];
                    return u_linedata;
                })(d);
                return this._lineFunction(u_line);
            });

        // Transition links to their new position. 
        link.transition()
            .duration(this._duration)
            .attr("d", (d:any) => {
                let u_line = ((d:any) => {
                    let u_linedata = [{ "x": d.source.x + (this._rectW / 2), "y": d.source.y + this._rectH },
                        { "x": d.source.x + (this._rectW / 2), "y": d.target.y - this._margin.top / 2 },
                        { "x": d.target.x + (this._rectW / 2), "y": d.target.y - this._margin.top / 2 },
                        { "x": d.target.x + (this._rectW / 2), "y": d.target.y }];
                    return u_linedata;
                })(d);
                return this._lineFunction(u_line);
            });

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(this._duration)
            .attr("d", (d:any) => {
                /* This is needed to draw the lines right back to the caller */
                let u_line = ((d:any) => {
                    let u_linedata = [{ "x": this._callerNode.x + (this._rectW / 2), "y": this._callerNode.y + this._rectH + 2 },
                        { "x": this._callerNode.x + (this._rectW / 2), "y": this._callerNode.y + this._rectH + 2 },
                        { "x": this._callerNode.x + (this._rectW / 2), "y": this._callerNode.y + this._rectH + 2 },
                        { "x": this._callerNode.x + (this._rectW / 2), "y": this._callerNode.y + this._rectH + 2 }];
                    return u_linedata;
                })(d);
                return this._lineFunction(u_line);
            }).each("end", () => { this._callerNode = null; /* After transition clear the caller node letiable */ });

        // Stash the old positions for transition.
        this._nodes.forEach(function (d:any) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    };

    // Toggle children on click.
    nodeClick(): (d:any) => void {
        return (d) => {
            this._callerNode = d;
            if (d.children) {
                this._callerMode = 0;     // Collapse
                d.tempChildren = d.children;
                d.children = null;
                // Toggles the collapse caret
                $("#Node" + d.issueId).removeClass("glyphicon-menu-up").addClass("glyphicon-menu-down");
            } else {
                this._callerMode = 1;     // Expand             
                d.children = d.tempChildren;
                d.tempChildren = null;
                // Toggles the collapse caret
                $("#Node" + d.issueId).removeClass("glyphicon-menu-down").addClass("glyphicon-menu-up");
            }

            this.update(d);
        }
    };

    //Redraw for zoom
    redraw(): (d:any, i:any) => void {       
        return (d, i) => {
            this._svg.attr("transform", "translate(" + (<any>d3.event).translate + ")" +
                " scale(" + (<any>d3.event).scale.toFixed(1) + ")");
        }
    };

    // Set up the tree for the first time
    initTree(options:any): void {
        let u_opts = $.extend({
            id: "",
            data: {},
            modus: "line",
        }, options);
        
        let id = u_opts.id;

        this._mode = u_opts.modus;
        this._root = u_opts.data;
        
        $(id).html("");   // Reset
        let width = $(id).innerWidth();
        let height = $(id).innerHeight();
        
        // Set node dimensions for tree
        this._tree = d3.layout.tree().nodeSize([this._rectW + this._rectSpacing, this._rectH + this._rectSpacing]);

        /* Basic setup for the line function. _mode = "line" */
        this._lineFunction = d3.svg.line<DataType>()
            .x(function (d:any) { return d.x; })
            .y(function (d:any) { return d.y; })
            .interpolate("linear");

        let u_childwidth = ((this._root.children.length * this._rectW) / 2);

        let zm:any = null;

        // Set up the svg element on the page
        this._svgroot = d3.select(id)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(zm = d3.behavior.zoom().scaleExtent([0.15, 3]).on("zoom", this.redraw()));

        // create a group for the nodes on the svg element
        this._svg = this._svgroot.append("g")
            .attr("transform", "translate(" + (u_childwidth + ((width - u_childwidth * 2) / 2) - this._margin.left / 2) + "," + 20 + ")");
        
        //necessary so that zoom knows where to zoom and unzoom from
        zm.translate([(u_childwidth + ((width - u_childwidth * 2) / 2) - this._margin.left / 2), 20]);

        this._root.x0 = 0;           // the root is already centered
        this._root.y0 = height / 2;  // draw & animate from center

        // Collapses the child nodes on init.
        //for (let i = 0; i < this._root.children.length; i++) {
        //    this.collapse(this._root.children[i]);
        //}
                
        this.update(this._root);
        d3.select(id).style("height", height + this._margin.top + this._margin.bottom);
    };
}