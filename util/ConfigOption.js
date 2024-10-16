import { Variable } from "resource:///com/github/Aylur/ags/variable.js";

export class ConfigOption extends Variable {
  static {
    Service.register(this);
  }

  constructor(initial, type = "string", comment = "", persistent = false) {
    super(initial);
    this.initial = initial;
    this.persistent = persistent;
    this.temporaryValue = initial;
  }

  getType() {
    return this.type;
  }

  getValue() {
    return super.getValue();
  }

  getTempValue() {
    return this.temporaryValue;
  }

  setTempValue(newValue) {
    this.temporaryValue = newValue;
  }

  applyChanges() {
    this.value = this.temporaryValue;
  }

  getComment() {
    return this.comment;
  }

  reset() {
    this.value = this.initial;
    this.temporaryValue = this.initial;
  }
}

export const ConfigOpt = (initial, type, comment, persistent) =>
  new ConfigOption(initial, type, comment, persistent);
