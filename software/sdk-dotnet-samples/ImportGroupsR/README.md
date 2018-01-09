# Import Groups by Reference 
## Reference-based Group Importing

- [Introduction](#introduction)
  * [Parsing and Import](#parsing-and-import)
- [ImportGroupR Command Line](#importgroupr-command-line)
  * [Command Line Arguments](#command-line-arguments)
- [importGroups.csv File](#importgroupscsv-file)
  * [Example importGroups.csv Files](#example-importgroupscsv-files)
  * [importGroups.csv — Description of Fields](#importgroupscsv---description-of-fields)
- [ImportGroupR Details](#importgroupr-details)
  * [Top-down Parsing and Importing](#top-down-parsing-and-importing)
  * [Unique Naming](#unique-naming)
  * [Reference Name Substitution](#reference-name-substitution)
  * [Uniqueness Verification](#uniqueness-verification)
  * [Color Values](#color-values)
- [ImportGroupR Process](#importgroupr-process)
  * [Import](#import)
  * [Update](#update)
  * [Move](#move)
  * [Delete](#delete)
    + [-d Is Not Provided](#-d-is-not-provided)
    + [-d Is Provided](#-d-is-provided)
      - [and -m is not provided](#and--m-is-not-provided)
      - [and -m is provided](#and--m-is-provided)

## Introduction

This document outlines the ImportGroupR tool, which is used for importing groups based on references. It is similar to the ImportGroups tool.

The main purpose of the ImportGroupR tool is to synchronize the group structure of MyGeotab with a group structure given by an external source. ImportGroupR takes a full group structure as input in the form of a **.csv** file. The group structure will be processed and added to the MyGeotab group structure. If input is provided to the tool iteratively, the tool will attempt to make adjustments to the MyGeotab group structure to reflect the difference between the existing groups and the groups defined in the new .csv input file.

### Parsing and Import

The operation of the ImportGroupR tool can be logically separated into two stages:

1. Parsing of the **importGroups.csv** file
2. Import of the parsed groups into the MyGeotab database

## ImportGroupR Command Line

The ImportGroupR tool is a console application with the following command line:

`dotnet run <MyGeotab Server Name> <Database Name> <Input File Path> <User Name> <Password> -f <Log File Path> -v -r <Root Group Reference> -d -m`

For comparison, the command line of the similar SDK ImportGroup is:

`dotnet run <MyGeotab Server Name> <Database Name> <User Name> <Password> <Input File Path>`

### Command Line Arguments

| **-f**  **<Log File Path>** — Optional argument. Specifies the full path of the output log file. If omitted, the log output will appear in the console window. |
| --- |
| **-v** — Optional argument for verbose logging. |
| **MyGeotab Server Name, Database Name, User Name, Password, Input File Path** — These arguments are specific to the individual user, e.g. localhost as Server Name, company123 as Database Name. |

For the remainder of this document, the file name at the end of the <Input File Path> is assumed to be **importGroups.csv**.

| **-r**  **<Root Group Reference>** — Optional argument. <Root Group Reference> is the ImportGroupR **Root Group** Reference value for the root node of the group tree that the tool will manage. If this parameter is omitted, the Company Group will be used instead.You may opt to use the root node name instead of the Reference value as described below.The ImportGroupR tool shall only manage groups under the ImportGroupR **Root Group** node. The groups outside this tree (e.g. Device Groups, Emailed Reports, etc.) and their child groups will not be affected. |
| --- |
| **-d** — Optional argument. If provided, the groups that are in the MyGeotab database under the ImportGroupR **Root Group** , but not in the **importGroups.csv** file, shall be deleted if they contain no assets (i.e., child groups, devices, zones, users, etc.).If the parameter is omitted, such groups shall be logged in the log file as existing in the database but missing from the **importGroups.csv** file. |
| **-m** — Optional argument.Implementation forthcoming.If provided concurrently with the **-d** argument, the tool will follow more severe rules for deletion. The rules are as follows:The groups found in the MyGeotab database but not in the **importGroups.csv** file will be deleted if empty. If not empty, the group&#39;s assets shall be moved to its parent and then the group will be deleted. |

Example of command line: `dotnet run my.geotab.com geotabdemo importGroups.csv youruser@yourdomain.com yourpassword -f importGroups.log -v -r "New Region Structure"`

## importGroups.csv File

The **importGroups.csv** file is the input file to the ImportGroupR tool. This file shall represent the entire group tree structure under the ImportGroupR **Root Group** as stored on the MyGeotab server.

The **importGroups.csv** file will be a text file list of comma separated values (CSV). The first row (the header row) will begin with the number sign (#) to distinguish it from the other rows.

The structure of the **importGroups.csv** file is outlined in Table 1 below:

**Table 1** : Description of the **importGroups.csv** file. A country organization is used as an example.

| **Parent Name** | **Parent Reference** | **Child Name** | **Child Reference** | **Child Color** | **Child Description** |
| --- | --- | --- | --- | --- | --- |
| New Region Structure | New Region Structure | Saskatchewan | 3002 |   |   |
| New Region Structure | New Region Structure | Quebec | 3004 |   |   |
| Quebec | 3004 | Quebec City - 344 | 3004004 |   |   |
| Quebec City - 344 | 3004004 | 344-0928 | 30040040928 |   |   |

### Example importGroups.csv Files

An example **importGroups.csv** file that expands on the data in the table above can be found [here](https://drive.google.com/open?id=0B2W5CaI_qfvMNDBIbldKV2t6V2M).

A modified version of the initial file with updated information in the Child Name, Child Color, and Child Description fields can be found [here](https://drive.google.com/open?id=0B2W5CaI_qfvMY3pIZk9zS09ad28).

An extended version of the initial file with additional groups added can be found [here](https://drive.google.com/open?id=0B2W5CaI_qfvMdTVVOVRIQlQtaTQ).

### importGroups.csv — Description of Fields

The fields in the input file will have the following characteristics:

**Table 2** : **importGroups.csv** field characteristics.

| **Field Name** | **Data Type** | **Mandatory** | **Default (if not specified)** | **Allowable Value** | **Notes** |
| --- | --- | --- | --- | --- | --- |
| Parent Name | nvarchar(255) | Yes | N/A | String of max 250 Unicode characters |   |
| Child Name | nvarchar(255) | Yes | N/A | String of max 250 Unicode characters |   |
| Parent Reference | nvarchar(255) | No (Optional) | Corresponding Parent Name, Child Name | String of max 250 Unicode characters |   |
| Child Reference | nvarchar(255) | No (Optional) | Corresponding Parent Name, Child Name | String of max 250 Unicode characters |   |
| Child Description | nvarchar(1024) | No (Optional) | Empty String | String of max 1020 Unicode characters |   |
| Child Color | int | No (Optional) | 0 | 16729344167539203276816776960113932542558388736 | red, rgb(255, 69, 0)orange, rgb(255, 165, 0)green, rgb(0, 128, 0)yellow, rgb(255, 255, 0)cyan, rgb(173, 216, 230)blue, rgb(0, 0, 255)purple, rgb(128, 0, 128) |

## ImportGroupR Details

### Top-down Parsing and Importing

The ImportGroupR tool will assume that the parent group in the first line of the **importGroups.csv** file exists in the MyGeotab database and that it is either the ImportGroupR **Root Group** or its child.

If the Company Group is intended to serve as the Root Group, the Parent Reference field should have a value of &#39;Company Group&#39; with no quotes. The Parent Name field value will be ignored in this case.

> The import will fail if the root (first line) of **importGroups.csv** is not in the MyGeotab database.

When the ImportGroupR tool processes each line in the **importGroups.csv** file, it will assume that the Parent Name and Parent Reference (if not omitted) have been encountered in preceding lines. If this is not the case, the parsing of such a line will fail and the import of the corresponding Child Group will not occur. An exception will be logged.

> A Child Group is set for import when a line is processed; the Parent Group is set for import if and when the line where it was a Child Group is processed.

### Unique Naming

The following points apply to the Child Name, Parent Name, Child Reference, and Parent Reference fields:

- Group Names must be unique at the same level in the hierarchy, but do not have to be unique otherwise.
- The Reference for any Group will be unique through the entire Group Tree managed by the ImportGroupR tool (i.e., beginning at ImportGroupR **Root Group** and proceeding down to its child groups).
> The entire **Group Tree** managed by the ImportGroupR tool is further referred to as the **Group Tree**.
- The Reference of the ImportGroupR **Root Group** shall be unique over the entire group structure of the database.

### Reference Name Substitution

If Parent Reference or Child Reference is omitted from a row in the **importGroups.csv** file, the ImportGroupR tool will insert the Parent Name or Child Name value into the respective Parent Reference or Child Reference field.

Such References are further referred to as **Substituted References**.

Because the Reference has to be unique through the entire Group Tree, the Parent Name/Child Name must be unique throughout the entire Group Tree.

Substituted References shall be recorded in the MyGeotab database.

### Uniqueness Verification

The ImportGroupR tool will verify the uniqueness of **Child References** specified in the **importGroups.csv** file or **Substituted Child References** when parsing the **importGroups.csv** file.

If a line in **importGroups.csv** is found to have an identical Child Reference to one encountered earlier in the parsing process, then the line will be rejected. An exception shall be logged and the corresponding Child Group will not be imported. The parsing of **importGroups.csv** will continue.

The ImportGroupR tool will also verify the uniqueness of the Reference or Substituted Reference of the ImportGroupR **Root Group** over the entire group structure of the database. If the Root Group Reference is found not to be unique, the exception will be logged and the entire import will fail.

### Color Values

Colors and their corresponding RGB values in Table 2 are taken from the UI of the existing MyGeotab Group Editor.

This [site](http://www.shodor.org/stella2java/rgbint.html) was used for rgb to int conversion and can be used for color visualization.

If a value different from the allowable ones is specified for the color, the **ImportGroupR** tool shall use the closest lower value from the table above.

## ImportGroupR Process

The ImportGroupR tool will perform the following processes as it executes:

### Import

If a Child Reference is not present in the MyGeotab database the tool shall log the import with the status:

`Imported with status Added <Child Name> <Child Reference> child of <Parent Name> <Parent Reference>`

### Update

If a Child Reference is present in the MyGeotab database under the same Parent Reference group, and the fields Child Name, Child Color, Child Description are the same in both **importGroups.csv** and the database, the tool shall log the import with the status:

`Imported with status Existing <Child Name> <Child Reference> <Child Reference> child of <Parent Name> <Parent Reference>`

If any of the Child Name, Child Color, Child Description fields differ between **importGroups.csv** and the database, the tool shall update the fields in the database with the values in **importGroups.csv** and log the import with the status:

`Imported with status Updated <Child Name> <Child Reference> child of <Parent Name> <Parent Reference>`

### Move

If a Child Reference is present in the MyGeotab database under a different Parent Reference group than in the **importGroups.csv** and the fields Child Name, Child Color, Child Description are the same in **importGroups.csv** as in the database, the tool shall move the child to the new parent described in the **importGroups.csv** file and log the import with the status:

`Imported with status MovedExisting <Child Name> <Child Reference> from <Old Parent Name> <Old Parent Reference> to <New Parent Name> <New Parent Reference>`

If any one of the Child Name, Child Color, or Child Description fields is different between **importGroups.csv** and the database, the tool shall move the child to the new parent described in the **importGroups.csv** file and log the import with the status:

`Imported with status MovedUpdated <Child Name> <Child Reference> from <Old Parent Name> <Old Parent Reference> to <New Parent Name> <New Parent Reference>`

### Delete

See the description of the **-d** and **-m** command line arguments above.

#### -d Is Not Provided

If a Child Reference is present in the MyGeotab database, but not in the **importGroups.csv,** no change in the database will occur with the log message:

`Imported with status DeletionCandidate <Child Name> <Child Reference> child of <Parent Name> <Parent Reference>`

#### -d Is Provided

> In the MyGeotab database, if an object is associated with a group (Group 1) it cannot be also associated with any other group (Group 2) that is an ancestor or a descendent of Group 1.

> In the UI of MyGeotab, a group cannot be deleted if it contains objects of the types described below. An error message will be displayed if a deletion is attempted. However, if a group has child group(s) but doesn&#39;t contain these objects, such parent groups can be deleted in the UI and the child group(s) will automatically become children of the deleted group&#39;s parent group.

Since **importGroups.csv** represents the entire CompanyGroup tree of a MyGeotab database, this tool cannot encounter the case when the input will indicate the deletion of a group without also indicating that its child group(s) shall also be deleted.

#####  and -m is not provided

If a Child Reference is present in the MyGeotab database, but not in **importGroups.csv** , the conditional below follows:

**If** the child group is empty it will be deleted from MyGeotab database with log:
`Imported with status Deleted <Child Name> <Child Reference> child of <Parent Name> <Parent Reference>`
**Else**
`Imported with status CannotDeleteNotEmpty <Child Name> <Child Reference> child of <Parent Name> <Parent Reference>`

A non-empty group that is candidate for deletion (that is, it is not in the **importGroups.csv** file) can be associated with the objects of the types described below. The logging behaviour will depend on those types.

1. **Assets** : Device, Exception Rule, Zone, User, Driver. The relationship Group-to-Asset is many-to-many for all these, e.g. Device<<->>Group. If a candidate for deletion contains assets, the assets of each class will be logged as:
`Associated Assets: <Asset Name 1>, <Asset Name 2>`
E.g.:
`Associated Drivers: <Driver1@geotab.com>, <Driver2@geotab.com>`
2. **Custom Report Schedule** as
    1. ScopeGroups appear on MyGeotab Custom Report UI as
        1. on **Report View** tab: "Who can see this report:"
Log:
`Associated Custom Reports: Report view <Report Name 1> with the group above in <Who can see this report:>[,Report view <Report Name 2> with the group above in <Who can see this report:>, …Report view <Report Name N> with the group above in <Who can see this report:>].`
        2. on **Dashboard and Email Report** tabs: "Belonging to:"
Log for Dashboard:
`Associated Custom Reports: Dashboard <Report Name 1> with the group above in <Belonging to:>[,Dashboard <Report Name 2> with the group above in Belonging to:>, …Dashboard <Report Name N> with the group above in Belonging to:>].`
Log for Email Report:
`Associated Custom Reports: Email Report <Report Name 1> with the group above in <Belonging to:>[,Email Report <Report Name 2> with the group above in Belonging to:>, …Email Report <Report Name N> with the group above in Belonging to:>].`
    2. IncludeAllChildrenGroups or IncludeDirectChildrenOnlyGroups appear on MyGeotab Custom Report UI as
        1. on Report View tab: None
        2. on Dashboard tab: " **Dashboard Viewers** :" as "All In" or "Onlly In"
Log Example:
`Associated Custom Reports: Dashboard <Report Name 1> with the group above in <Dashboard Viewers:> as <All In>; Dashboard <Report Name2> with the group above in <Dashboard Viewers:> as <Only In>.`
        3. On Email Report tab: " **Recipient list** :" as "All In" or "Only In"
Log Example:
`Associated Custom Reports: Email Report <Report Name 1> with the group above in <Recipient List:> as <All In>; Email Report <Report Name 2> with the group above in <Recipient List:> as <Only In>.`

#####  and -m is provided

A non-empty group that is candidate for deletion (that is, it is not in the **importGroups.csv** file) can be associated with the objects of the types described below. The deletion behaviour will depend on those types.

1. **Assets** : Device, Exception Rule, Zone, User, Driver. The relationship Group-to-Asset is many-to-many for all these, e.g. Device<<->>Group. If a candidate for deletion contains assets, then each asset that does not belong to a group descendant of the parent group of the the candidate for deletion (further referred to as the parent group) will be moved to the parent group with optional log:
`TBD.`
Each asset that does belong to a descendant of the parent group will not be moved to the parent group.
The log message will be:
`Group association lost: Device <Name> was not moved from <Child Name> <Child Reference> to <Parent Name> <Parent Reference> because it is in <Descendant Child Name> <Descendant Child Reference>`
or similar, starting with "Group association lost:" depending on the asset. The candidate for deletion will then be deleted from MyGeotab with the log message:
`Imported with status Deleted <Child Name> <Child Reference> child
of <Parent Name> <Parent Reference>`

**Example** :

When the Oakville group is deleted, Device2 will be moved to Ontario Group, but Device1 will not be moved to Ontario Group, because it is associated with East Burlington Group. The MyGeotab UI in this case would have moved Device1 to Ontario Group and would have disassociated Device1 from East Burlington Group.

However, when both Oakville and East Burlington Group are deleted, Device1 will be moved to the Ontario Group.

2. **Custom Report Schedule** as:
    1. ScopeGroups appear in the MyGeotab Custom Report UI (same deletion behaviour as for Assets):
        1. on **Report View** tab as: "Who can see this report:"
        2. on **Dashboard and Email Report** tabs as: "Belonging to:"

    2. IncludeAllChildrenGroups or IncludeDirectChildrenOnlyGroups appear in the MyGeotab Custom Report UI:
        1. On Report View tab as: None
        2. On Dashboard tab as: " **Dashboard Viewers** :" as "All In" or "Only In"
        3. On Email Report tab as: " **Recipient list** :" as "All In" or "Only In"

        The deletion behaviour shall be similar to Assets with the following differences:
        
        **For each** Custom Report Schedule associated with the candidate for deletion as IncludeAllChildrenGroups.
        **If** the Custom Report Schedule belongs to a group descended from the parent group of the candidate for deletion as either IncludeAllChildrenGroup or IncludeDirectChildrenOnlyGroups, the Custom Report Group will not be moved to the parent group with log message:
        `Group association lost: Custom Report Schedule <name> associated with <Child Name> <Child Reference> as IncludeAllChildrenGroups was not moved to <Parent Name> <Parent Reference> due to association with <Descendant Child Name> <Descendant Child Reference>`
        **Else**
        If the Custom Report Schedule belongs to the candidate for deletion parent group as IncludeDirectChildrenOnlyGroups, the Custom Report Schedule will be disassociated as IncludeDirectChildrenOnlyGroups from the parent with the optional log:
        `TBD.`
        The Custom Report Schedule will be associated with the parent group of the candidate for deletion as IncludeAllChildrenGroups with the optional log:
        `TBD.`
        
        **For each** Custom Report Schedule associated with the candidate for deletion as IncludeDirectChildrenOnlyGroups
        **If** the Custom Report Schedule does not belong to the parent group of the candidate for deletion as IncludeDirectChildrenOnlyGroups, the Custom Report Schedule will be associated with the candidate for deletion parent group as IncludeDirectChildrenOnlyGroups with the optional log:
        `TBD.`
        The candidate for deletion will then be deleted with the log message:
        `Imported with status Deleted <Child Name> <Child Reference> child of <Parent Name> <Parent Reference>`

3. **Status Groups** : Status Groups are created on the Vehicle Edit page under the Groups tab beside the label **Messaging status groups**. They belong to the Company Group tree and specify status button labels on an attached Garmin device. Since a parent of any group cannot be deleted by the ImportGroupR tool unless the group itself is deleted, Status Groups are orthogonal to (i.e. have no bearing on) the Delete scenario.
4. **DVIRLog** : Groups with which DVIRLogs are associated are not in the Company Group tree but rather in the Defects group tree, which the ImportGroupR tool does not manage. Therefore, DVIRLogs cannot prevent groups in the Company Group tree from being deleted and are thus not relevant to this specification.
