public class projectToMilestoneToTasklist {
    @AuraEnabled
    public static list<Project1__c> getgoods(){
        list<Project1__c> allProject = [SELECT Id, Name, Deadline__c, Description__c,
                                     No_of_Milestone__c,Account__r.Name, Status__c FROM Project1__c];
        
        return allProject;
    }
    
    @AuraEnabled
    public static list<Milestone__c> onsave(list<Task_List__c> tasklist, list<Project1__c> projectlist, String milestoneName, String milestoneDes) {        

        List<Milestone__c> customMilestones = new List<Milestone__c>();
        for (Project1__c project : projectlist) {
            Milestone__c milestone = new Milestone__c();
            milestone.Name = milestoneName;
            milestone.Description__c = milestoneDes;
            milestone.Project__c = project.Id;
            milestone.Stage__c = 'Planned';
            customMilestones.add(milestone);
        }
        insert customMilestones;
        
                List<Task_List__c> customTasks = new List<Task_List__c>();

        List<Milestone__c> mile = [SELECT Id, Name,Description__c,Project__c FROM Milestone__c where Id In: customMilestones]; 
        
            for(Milestone__c m : mile){
               for(Task_List__c ts : tasklist){ 
                Task_List__c task = new Task_List__c();
                task.Name = ts.Name;
                task.Description__c = ts.Description__c;
                task.Milestone__c = m.Id;
                task.Project__c = m.Project__c;
                task.Task_Type__c = 'Configuration';
                task.Task_Done_in_Sandbox_Or_Production__c = 'Production';
                task.MetaData_Type__c = 'Other';
                task.Incurred_By__c = ts.Project__r.Name;
                task.Client_Confirmation_Required__c = 'Yes';
                customTasks.add(task);
            }
        }
        
        insert customTasks;
        return mile;
    }
}