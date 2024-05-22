({
    doInit: function (component, event, helper) {
        var action = component.get("c.getTasks");
        //action.setParams({'searchText':  component.get('v.searchText')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.CaseWrapper',  response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    dragStart : function (component, event, helper) {
        var taskId = event.currentTarget.dataset.id;
        //alert(taskId);
        event.dataTransfer.setData("text", taskId);
    },
    allowDrop : function (component, event, helper) {
        event.preventDefault();
    },
    onNewDrop : function (component, event, helper) {
        helper.updateDraggedTask(component,  event, helper, event.dataTransfer.getData("text", event.currentTarget.dataset.id),'Planned');
    },
    onProgressDrop : function (component, event, helper) {
        helper.updateDraggedTask(component,  event, helper, event.dataTransfer.getData("text", event.currentTarget.dataset.id),'In Progress');
    },
    onClosedDrop : function (component, event, helper) {
        alert( event.dataTransfer.getData("text", event.currentTarget.dataset.id));
        helper.updateDraggedTask(component,  event, helper, event.dataTransfer.getData("text", event.currentTarget.dataset.id),'Paused');
    },
    
    
})