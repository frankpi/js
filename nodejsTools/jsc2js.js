gb.GMControlView = jx.BaseView.extend({
    ctor: function() {
        this._super();
        this.addLayout(mb.res.GMControl_Json, true, true);
        this.addClickListenerByName("btnCancel", this.onBtnCancel.bind(this));
        this.addClickListenerByName("btnOK", this.onBtnOK.bind(this));
        this.ebInput = jx.utils.textFieldToEditbox(this.getComponentByName("tfGM"), 50, cc.color(0, 0, 0));
        this.ebInput.setString("");
    },
    top: function() {
        this._super(b);
        if (! (cc.sys.isNative)) {
            this.ebInput.setVisible(b);
        }
    },
    onBtnCancel: function() {
        this.ebInput.setString("");
        this.hide();
        gb.GMControlView.ins = null;
    },
    onBtnOK: function() {
        _local0 = this.ebInput.getString();
        if ((_local0 != "")) {
            mb.netHandler.gameManage(_local0, this.onGMResult.bind(this));
        } else {}
        this.onBtnCancel();
    },
    onGMResult: function() {
        _local0 = data.result;
        _local1 = data.reason;
        if (_local0) {
            jx.alert("Set GM Success", jx.AlertButtonType.OK);
        } else {}
        jx.alert(_local1, jx.AlertButtonType.OK);
        this.onBtnCancel();
    }
}); 
