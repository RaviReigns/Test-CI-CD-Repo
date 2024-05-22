trigger milestoneAndTaskList on Project1__c (after insert, after update) {
    
    /* Use a static Boolean variable to track if the update has been performed for a specific trigger run
    static Boolean run = false;
    
    // Skip further processing if the update has already been performed
    if (run) return;
    
    List<Project1__c> projectsToUpdate = new List<Project1__c>();
    List<Project1__c> projects = [SELECT Id, Name, Description__c, Checklist_Created__c, Owner__c FROM Project1__c where Id In : Trigger.New];
    
    for (Project1__c project : projects) {
        if (!project.Checklist_Created__c) {
            projectsToUpdate.add(project);
        }
    }
    
    if (!projectsToUpdate.isEmpty()) {
        run = true;
        for (Project1__c project : projectsToUpdate) {
            project.Checklist_Created__c = true;
        }
        
        update projectsToUpdate;
        
        List<Milestone__c> customMilestones = new List<Milestone__c>();
        List<Master_Milestone__c> masterMilestones = [SELECT Id, Name,Description__c FROM Master_Milestone__c];
        
        for (Project1__c project : projectsToUpdate) {
            for (Master_Milestone__c masterMilestone : masterMilestones) {
                Milestone__c milestone = new Milestone__c();
                milestone.Name = masterMilestone.Name;
                milestone.Description__c = masterMilestone.Description__c;
                milestone.Project__c = project.Id;
                milestone.Stage__c = 'Planned';
                customMilestones.add(milestone);
            }
        }
        
        insert customMilestones;
        
        Map<Id,Id> milestonesByName = new Map<Id,Id>();
        for (Integer i = 0; i < customMilestones.size(); i++) {
            milestonesByName.put(masterMilestones[i].Id, customMilestones[i].Id);
        }
        
        List<Task_List__c> customTasks = new List<Task_List__c>();
        List<Master_Tasklist__c> masterTasks = [SELECT Id, Name,Description1__c,Master_Milestone__c FROM Master_Tasklist__c];
        
        for (Project1__c project : projectsToUpdate) {
            for (Master_Tasklist__c masterTask : masterTasks) {
                Task_List__c task = new Task_List__c();
                task.Name = masterTask.Name;
                task.Description__c = masterTask.Description1__c;
                task.Milestone__c = milestonesByName.get(masterTask.Master_Milestone__c);
                task.Project__c = project.Id;
                task.Task_Type__c = 'Configuration';
                task.Task_Done_in_Sandbox_Or_Production__c = 'Production';
                task.MetaData_Type__c = 'Other';
                task.Incurred_By__c = project.Owner__c;
                task.Client_Confirmation_Required__c = 'Yes';
                customTasks.add(task);
            }
        }
        
        insert customTasks;
    }*/
}