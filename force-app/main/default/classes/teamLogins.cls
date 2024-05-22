public class teamLogins {
    @AuraEnabled
    public static List<Team__c> fetchTeams() {
        return [SELECT Id, Name, Username__c, Password__c, Mobile__c, Availability__c, Pic__c FROM Team__c];
    }
    @AuraEnabled
    public static List<Team__c> getTeamList(String searchText) {
        if(String.isBlank(searchText)) {
            return fetchTeams();
        } else {
            String key = '%'+searchText+'%';
            String dynQuery  = 'SELECT Id, Name, Username__c, Password__c, Mobile__c, Availability__c, Pic__c FROM Team__c where (Username__c LIKE : key) or (Name LIKE : key)';
            return Database.query(dynQuery);
        }
    }
    @AuraEnabled
    public static Boolean getDetails(String username, String password)
    { 
        List<Team__c> con_List=[Select Id,Username__c,Password__c from Team__c where Username__c =: username AND Password__c =: password Limit 1];
        if(con_List.size() == 0)
        {
            return false; 
        }
        else
        {
            if(con_List[0].Password__c==password)
            {
                // Create a new Login_Details__c record
                Login_Details__c login = new Login_Details__c();
                login.Name = username + '--' + String.valueOf(system.today()).removeEnd('00:00:00');
                login.Login__c = system.today();
                login.Team__c = con_List[0].Id;
                insert login;
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    @AuraEnabled
    public static List<Login_Details__c> getLoginDetails(String teamMemberId) {
        Date today = Date.today();
        List<Login_Details__c> loginDetails = [SELECT Id, Login__c, Team__c FROM Login_Details__c WHERE Team__c =: teamMemberId AND DAY_ONLY(Login__c) = : today];
        
        return loginDetails;
    }
    @AuraEnabled
    public static List<Project1__c> getProjects() {
        return [SELECT Id, Name, Account__c, Deadline__c,Kickoff__c,Project_Owner__c,Project_Team__c, Status__c, Key_Contacts_Email__c,Description__c,
                Project_Team__r.Name,Account__r.Name,No_of_Milestone__c, Logo__c FROM Project1__c];
    }
    
    @AuraEnabled
    public static List<Project1__c> getProjectsList(String searchText) {
        if(String.isBlank(searchText)) {
            return getProjects();
        } else {
            String key = '%'+searchText+'%';
            String dynQuery  = 'SELECT Id, Name, Account__c, Deadline__c,Kickoff__c,Project_Owner__c,Project_Team__c, Status__c, Key_Contacts_Email__c,Description__c,Project_Team__r.Name,Account__r.Name,No_of_Milestone__c, Logo__c FROM Project1__c where Name LIKE : key';
            return Database.query(dynQuery);
        }
    }
    @AuraEnabled
    public static Integer selectedTask(String teamId) {
        return [SELECT COUNT() FROM Task_List__c WHERE Team__c = :teamId];
    }
    
}