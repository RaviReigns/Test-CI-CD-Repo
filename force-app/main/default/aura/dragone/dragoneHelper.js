({
    updateDraggedTask : function(component, event, helper,newTaskId,newStatus) {
        var action = component.get("c.updateTask");
        action.setParams({'newTaskId':  newTaskId, 'newStatus':newStatus});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.CaseWrapper',  response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})