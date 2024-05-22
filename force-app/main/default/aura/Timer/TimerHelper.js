({
    waitingTimeId: null,
    setStartTimeOnUI : function(component) {
        component.set("v.ltngIsDisplayed",true);
        var currTime =component.get("v.ltngTimmer");
        var ss = currTime.split(":");
        var dt = new Date();
        dt.setHours(ss[0]);
        dt.setMinutes(ss[1]);
        dt.setSeconds(ss[2]);
        
        var dt2 = new Date(dt.valueOf() - 1000);
        var temp = dt2.toTimeString().split(" ");
        var ts = temp[0].split(":");
        
        component.set("v.ltngTimmer",ts[0] + ":" + ts[1] + ":" + ts[2]);
        this.waitingTimeId =setTimeout($A.getCallback(() => this.setStartTimeOnUI(component)), 1000);
        if(ts[0]==0 && ts[1]==0 && ts[2]==0 ){
            component.set("v.ltngTimmer","EXPIRED");
            window.clearTimeout(this.waitingTimeId);
            component.set("v.ltngIsDisplayed",false);
        }
    },
    setStopTimeOnUI : function(component) {
        component.set("v.ltngIsDisplayed",false);
        window.clearTimeout(this.waitingTimeId);
    },
    setResetTimeOnUI : function(component) {
        component.set("v.ltngIsDisplayed",false);
        component.set("v.ltngHour","0");
        component.set("v.ltngMinute","0");
        component.set("v.ltngSecond","0");
        component.set("v.ltngTimmer","00:00:00");
        window.clearTimeout(this.waitingTimeId);
    }
})