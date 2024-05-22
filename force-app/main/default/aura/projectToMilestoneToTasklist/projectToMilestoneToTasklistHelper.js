({
    addrows : function(component, event, helper) {
        var lltp=component.get("v.tasklist");
        
        var obj={};
        //   obj.Quantity__c=1;
        lltp.push(obj);
        component.set("v.tasklist",lltp);
        console.log('tasklist----->'+lltp);
    },
})