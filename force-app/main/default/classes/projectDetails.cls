public with sharing class projectDetails {
    @AuraEnabled
    public static List<sObject> getProjectTasks(String whichProject, String tabName, String whichObject) {
        List<Milestone__c> miles = new List<Milestone__c>();
        List<Task_List__c> tasks = new List<Task_List__c>();
        List<MOM__c> moms = new List<MOM__c>();
        if(whichObject == 'Milestone'){
            if(tabName == 'SearchAll' ) {
                List<Milestone__c> dynQueryM  = [SELECT Id, Name, Project__c, Status__c, Milestone_Order__c, Contact__c, Deadline__c, Team__c FROM Milestone__c WHERE Project__c =: whichProject];
                miles.addAll(dynQueryM);
            }
            else {
                List<Milestone__c> dynQueryM = [SELECT Id, Name, Project__c, Status__c, Milestone_Order__c, Contact__c, Deadline__c, Team__c FROM Milestone__c WHERE Project__c =: whichProject AND Status__c =:tabName];
                miles.addAll(dynQueryM);
            }
        }else if(whichObject == 'TaskList'){
            if(tabName == 'SearchAll' ) {
                List<Task_List__c> dynQueryT  = [SELECT Id, Name, Description__c, Milestone__c, Project__c, Task_Type__c, Status__c, Project_Status__c, Team__c, Verification_Done_By__c, Assigned_By__c, Incurred_By__c, Changes_and_Status__c, Login_Details__c FROM Task_List__c WHERE Project__c =: whichProject];
                tasks.addAll(dynQueryT);
            }
            else {
                List<Task_List__c>  dynQueryT  = [SELECT Id, Name, Description__c, Milestone__c, Project__c, Task_Type__c, Status__c, Project_Status__c, Team__c, Verification_Done_By__c, Assigned_By__c, Incurred_By__c, Changes_and_Status__c, Login_Details__c FROM Task_List__c WHERE Project__c =: whichProject AND Status__c =:tabName];
                tasks.addAll(dynQueryT);
            } 
        }else if(whichObject == 'MOM'){
            if(tabName == 'SearchAll' ) {
                List<MOM__c> dynQueryO  = [SELECT Id, Name, Project1__c, Milestone__c, Status__c, Created_Member__c, Details__c, purpose__c FROM MOM__c WHERE Project1__c =: whichProject];
                moms.addAll(dynQueryO);
            }
            else {
                List<MOM__c> dynQueryO  = [SELECT Id, Name, Project1__c, Milestone__c, Status__c, Created_Member__c, Details__c, purpose__c FROM MOM__c WHERE Project1__c =: whichProject AND Status__c =:tabName];
                moms.addAll(dynQueryO);
            }
        }
        if(miles.size() != 0 ){
            return miles;
        }else if(tasks.size() != 0 ){
            return tasks;
        }else {
            return moms;
        }
    }
    
    @AuraEnabled
    public static List<sObject> getAllTasks(String searchText, String tabName, String whichProject, String whichObject) {
        List<Milestone__c> miles = new List<Milestone__c>();
        List<Task_List__c> tasks = new List<Task_List__c>();
        List<MOM__c> moms = new List<MOM__c>();
        if(String.isBlank(searchText)) {
            if(whichObject == 'Milestone'){
                if(tabName == 'SearchAll' ) {
                    List<Milestone__c> dynQueryM  = [SELECT Id, Name, Project__c, Status__c, Milestone_Order__c, Contact__c, Deadline__c, Team__c FROM Milestone__c WHERE Project__c =: whichProject];
                    miles.addAll(dynQueryM);
                }
                else {
                    List<Milestone__c> dynQueryM = [SELECT Id, Name, Project__c, Status__c, Milestone_Order__c, Contact__c, Deadline__c, Team__c FROM Milestone__c WHERE Project__c =: whichProject AND Status__c =:tabName];
                    miles.addAll(dynQueryM);
                }
            }else if(whichObject == 'TaskList'){
                if(tabName == 'SearchAll' ) {
                    List<Task_List__c> dynQueryT  = [SELECT Id, Name, Description__c, Milestone__c, Project__c, Task_Type__c, Status__c, Project_Status__c, Team__c, Verification_Done_By__c, Assigned_By__c, Incurred_By__c, Changes_and_Status__c, Login_Details__c FROM Task_List__c WHERE Project__c =: whichProject];
                    tasks.addAll(dynQueryT);
                }
                else {
                    List<Task_List__c>  dynQueryT  = [SELECT Id, Name, Description__c, Milestone__c, Project__c, Task_Type__c, Status__c, Project_Status__c, Team__c, Verification_Done_By__c, Assigned_By__c, Incurred_By__c, Changes_and_Status__c, Login_Details__c FROM Task_List__c WHERE Project__c =: whichProject AND Status__c =:tabName];
                    tasks.addAll(dynQueryT);
                } 
            }else if(whichObject == 'MOM'){
                if(tabName == 'SearchAll' ) {
                    List<MOM__c> dynQueryO  = [SELECT Id, Name, Project1__c, Milestone__c, Status__c, Created_Member__c, Details__c, purpose__c FROM MOM__c WHERE Project1__c =: whichProject];
                    moms.addAll(dynQueryO);
                }
                else {
                    List<MOM__c> dynQueryO  = [SELECT Id, Name, Project1__c, Milestone__c, Status__c, Created_Member__c, Details__c, purpose__c FROM MOM__c WHERE Project1__c =: whichProject AND Status__c =:tabName];
                    moms.addAll(dynQueryO);
                }
            }
        } else {
            if(tabName == 'SearchAll'){
                if(whichObject == 'Milestone'){
                    String key = '%'+searchText+'%';
                    List<Milestone__c> dynQueryM  = [SELECT Id, Name, Project__c, Status__c, Milestone_Order__c, Contact__c, Deadline__c, Team__c FROM Milestone__c WHERE Name LIKE : key AND Project__c =: whichProject];
                    miles.addAll(dynQueryM);
                }
                if(whichObject == 'TaskList'){
                    String key = '%'+searchText+'%';
                    List<Task_List__c> dynQueryT  = [SELECT Id, Name, Description__c, Milestone__c, Project__c, Task_Type__c, Status__c, Project_Status__c, Team__c, Verification_Done_By__c, Assigned_By__c, Incurred_By__c, Changes_and_Status__c, Login_Details__c FROM Task_List__c WHERE Name LIKE : key AND Project__c =: whichProject];
                    tasks.addAll(dynQueryT);
                }
                if(whichObject == 'MOM'){
                    String key = '%'+searchText+'%';
                    List<MOM__c> dynQueryO  = [SELECT Id, Name, Project1__c, Milestone__c, Status__c, Created_Member__c, Details__c, purpose__c FROM MOM__c WHERE Name LIKE : key AND Project1__c =: whichProject];
                    moms.addAll(dynQueryO);
                }
            } else{
                if(whichObject == 'Milestone'){
                    String key = '%'+searchText+'%';
                    List<Milestone__c> dynQueryM  = [SELECT Id, Name, Project__c, Status__c, Milestone_Order__c, Contact__c, Deadline__c, Team__c FROM Milestone__c WHERE Name LIKE : key AND Project__c =: whichProject AND Status__c =: tabName];
                    miles.addAll(dynQueryM);
                }
                if(whichObject == 'TaskList'){
                    String key = '%'+searchText+'%';
                    List<Task_List__c> dynQueryT  = [SELECT Id, Name, Description__c, Milestone__c, Project__c, Task_Type__c, Status__c, Project_Status__c, Team__c, Verification_Done_By__c, Assigned_By__c, Incurred_By__c, Changes_and_Status__c, Login_Details__c FROM Task_List__c WHERE Name LIKE : key AND Project__c =: whichProject AND Status__c =: tabName];
                    tasks.addAll(dynQueryT);
                }
                if(whichObject == 'MOM'){
                    String key = '%'+searchText+'%';
                    List<MOM__c> dynQueryO  = [SELECT Id, Name, Project1__c, Milestone__c, Status__c, Created_Member__c, Details__c, purpose__c FROM MOM__c WHERE Name LIKE : key AND Project1__c =: whichProject AND Status__c =: tabName];
                    moms.addAll(dynQueryO);
                }
            }
        }
        if(miles.size() != 0 ){
            return miles;
        }else if(tasks.size() != 0 ){
            return tasks;
        }else {
            return moms;
        }
    }
    @AuraEnabled
    public static String createNewRecord(String whichObject, String whichProject, String newRecord, String teamMemberId, String recordStatus) {
        String newId = '';
        if(whichObject == 'Milestone'){
            Milestone__c milestone = new Milestone__c();
            milestone.Name = newRecord;
            milestone.Project__c = whichProject;
            milestone.Team__c = teamMemberId;
            milestone.Status__c = recordStatus;
            insert milestone;
            newId = milestone.Id;
        } else if(whichObject == 'TaskList'){
            Task_List__c task = new Task_List__c();
            task.Name = newRecord;
            task.Project__c = whichProject;
            task.Team__c = teamMemberId;
            task.Status__c = recordStatus;
            insert task;
            newId = task.Id;
        }else if(whichObject == 'MOM'){
            MOM__c mom = new MOM__c();
            mom.Details__c = newRecord;
            mom.Project1__c = whichProject;
            mom.Created_Member__c = teamMemberId;
            mom.Status__c = recordStatus;
            insert mom;
            newId = mom.Id;
        }
        return newId;
    }
    @AuraEnabled
    public static List<Team__c> fetchTeams() {
        return [SELECT Id, Name, Username__c, Password__c, Mobile__c, Availability__c, Pic__c FROM Team__c];
    }
    @AuraEnabled
    public static String assignTask(String idToUpdate, String TeamName) {
        Task_List__c  ToUpdate = [SELECT Id, Name, Description__c, Milestone__c, Project__c, Task_Type__c, Status__c, Project_Status__c, Team__c, Verification_Done_By__c, Assigned_By__c, Incurred_By__c, Changes_and_Status__c, Login_Details__c FROM Task_List__c WHERE Id =: idToUpdate LIMIT 1];
        if(ToUpdate.Incurred_By__c != TeamName){
            ToUpdate.Incurred_By__c = TeamName;
            update ToUpdate;
            return ToUpdate.Id;
        }
        return 'already assigned';
    }

}