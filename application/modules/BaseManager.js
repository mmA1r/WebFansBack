class BaseManager {
    constructor({ mediator }) {
        this.mediator = mediator;
        this.TRIGGERS = mediator.getTriggerNames();
        this.EVENTS = mediator.getEventNames();
    }
}

module.exports = BaseManager;