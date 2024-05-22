public class CalenderClass {
    @AuraEnabled
    public static List<String> getAllSubjectPicklistValues() {
        List<String> subjectValues = new List<String>();
        Schema.DescribeFieldResult fieldResult = Event.Subject.getDescribe();
        List<Schema.PicklistEntry> picklistValues = fieldResult.getPicklistValues();
        for(Schema.PicklistEntry picklistVal : picklistValues){
            subjectValues.add(picklistVal.getValue());
        }
        return subjectValues;
    }
    
    @AuraEnabled
    public static list<Event> getAllEvents(){
        list<Event> eventlist =[Select id, EndDateTime,StartDateTime,Subject from Event where createdById=:Userinfo.getUserId()] ;
        return eventlist;
    }
    
    @AuraEnabled
    public static void updateEvent(string eventid,string eventdate){
        system.debug(eventid);
        system.debug(eventdate);
        string eventdatelist = eventdate.replace('T',' ');
        
        system.debug(eventdatelist);
        Event e= new event(id = eventid);
        e.StartDateTime = DateTime.valueof(eventdatelist);
        update e;
        
    }
}