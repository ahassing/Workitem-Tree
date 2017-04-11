# Workitem Tree

[Live Demo Site](https://still-spire-23031.herokuapp.com/home)

## Project Dependencies
* .NET Core V1.0.1 SDK
* .NET Core V1.0.1 VS 2015 Tooling
![Mdcoreversion](Images/Markdown/mdcoreversion.png)
* Node and NPM for Angular package management
* Typescript 2.0 (Will get errors 'required' error messages if not installed. Restart Visual Studio after install)

## Project Notes
* AppSettings.json
	* Contains Database Connection Settings. Must update to your localdb settings
* Package.json
    * Contains a list of all NPM packages that are used in the project. Pulls in all of the Angular Components.
    * You will most likely get a Dependencies - not installed message after restoring the NPM Packages.
        * This is caused by fsevents which will only install on Mac. It is an optional dependency so it does not matter.
![Fsevents](Images/Markdown/fsevents.png)
* Project.json
    * The project.json file contains all the .net core project information as well as all of the nuget dependencies. If you had a package via nuget it will be displayed in this file.
* ClientApp
    * The Angular code goes here.

## SQL Source Control
Schema Changes (When connected to jmknust-proj.database.windows.net)
#### Scenerio 1 - Making a change in Microsoft Management Studio
1. Makes changes to Azure DB
2. Right click on DB Project and select 'Schema Compare'
![Md D B1](Images/Markdown/mdDB1.png)
3. Select the azure DB as your source and your local DB project as the target and run the comparison
![Md D B2](Images/Markdown/mdDB2.png)
4. It should display all of the changes you made.
5. Click on the Update button to Apply the schema changes to the Project files
#### Scenerio 2 - Making a change in visual studio and applying to Azure DB
1. Steps 1 & 2 above
2. Select the local DB Project as the source and Azure DB as target.
3. Steps 4 & 5 above

## API Routes Currently Working
* Issues: 
    * GET api/issue/\{Id}
    * GET api/issue/
    * PUT api/issue/\{Id} + Issue object
    * POST api/issue/ + Issue object
* Users:
    * GET api/user/
    * GET api/user/851B90E1-36AD-4C73-ADC7-9C4A1745DA54
* Status:
    * GET api/status/
    * GET api/status/\{Id}
* Priority:
    * GET api/priority/
    * GET api/priority/\{Id}
* StatusCategory
    * GET api/statusCategory/
    * GET api/statusCategor/\{Id}
* Projects
    * GET api/project/
    * GET api/project/\{Id}
* Tree
    * GET api/tree/\{ProjectId}
* IssueType
    * GET api/type/
    * GET api/type/\{Id}

