trigger leadConversiontrigger on Lead (before update) {
    
    List<Lead> convertedLeads = new List<Lead>();
    for(Lead convertedLead : Trigger.New) {
        if (convertedLead.IsConverted) {
            convertedLead.Status ='Converted';
            convertedLeads.add(convertedLead);
        }
    }
    //LeadQualStatusToConverted.setQualStatusConverted(convertedLeads);
}