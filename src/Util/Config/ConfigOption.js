import { Variable } from "resource:///com/github/Aylur/ags/variable.js";

export class ConfigOption extends Variable {
  static {
    Service.register(this);
  }

  constructor(
    initial,
    type = "string",
    comment = "",
    saveCallback = undefined
  ) {
    super(initial);
    this.initial = initial;
    this.temporaryValue = initial;
    this.type = type;
    this.saveCallback = saveCallback;
  }

  getType() {
    return this.type;
  }

  initValue(newValue) {
    this.temporaryValue = newValue;
    this.value = newValue;
  }

  getValue() {
    return super.getValue();
  }

  getTempValue() {
    return this.temporaryValue;
  }

  getInitialValue() {
    return this.initial;
  }

  setTempValue(newValue) {
    this.temporaryValue = newValue;
  }

  applyChanges() {
    this.value = this.temporaryValue;
    if (this.saveCallback) {
      this.saveCallback();
    }
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
