({
	myAction : function(component, event, helper) {
		
	},
    onDragStart :function(form,event) {
        event
        .dataTransfer
        .setData('text/plain', event.target.id);
        
        event
        .currentTarget
        .style
        .backgroundColor = 'yellow';
    },
    onDragOver : function (from,event) {
        event.preventDefault();
    },
    onDrop:function (form,event) {
        const id = event
        .dataTransfer
        .getData('text');
        const draggableElement = document.getElementById(id);
        const dropzone = event.target;
        dropzone.appendChild(draggableElement);
        event
        .dataTransfer
        .clearData();
        
    }
})