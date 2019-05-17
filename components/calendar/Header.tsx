import * as React from 'react';
import * as moment from 'moment';
import { PREFIX_CLS } from './Constants';
import Select from '../select';
import { Group, Button as RadioButton } from '../radio';
import Icon from '../icon';
import ButtonGroup from '../button/button-group';
import Button from '../button/button';

const Option = Select.Option;

export interface HeaderProps {
  prefixCls?: string;
  locale?: any;
  fullscreen?: boolean;
  yearSelectOffset?: number;
  yearSelectTotal?: number;
  type?: string;
  onValueChange?: (value: moment.Moment) => void;
  onTypeChange?: (type: string) => void;
  value: any;
  defaulValue: any;
  hideTypeSwitch?: boolean;
  showNavigation?: boolean;
}

export default class Header extends React.Component<HeaderProps, any> {
  static defaultProps = {
    prefixCls: `${PREFIX_CLS}-header`,
    yearSelectOffset: 2,
    yearSelectTotal: 5,
  };

  private calenderHeaderNode: HTMLDivElement;

  getYearSelectElement(year: number) {
    const { yearSelectOffset, yearSelectTotal, locale, prefixCls, fullscreen, defaulValue } = this.props;
    const start = defaulValue.year() - (yearSelectOffset as number);
    const end = start + (yearSelectTotal as number);
    const suffix = locale.year === '年' ? '年' : '';

    const options: React.ReactElement<any>[] = [];
    for (let index = start; index < end; index++) {
      options.push(<Option key={`${index}`}>{index + suffix}</Option>);
    }
    return (
      <Select
        size={fullscreen ? 'default' : 'small'}
        dropdownMatchSelectWidth={false}
        className={`${prefixCls}-year-select`}
        onChange={this.onYearChange}
        value={String(year)}
        getPopupContainer={() => this.calenderHeaderNode}
      >
        {options}
      </Select>
    );
  }

  getMonthsLocale(value: moment.Moment) {
    const current = value.clone();
    const localeData = value.localeData();
    const months: any[] = [];
    for (let i = 0; i < 12; i++) {
      current.month(i);
      months.push(localeData.months(current));
    }
    return months;
  }

  getMonthSelectElement(month: number, months: number[]) {
    const props = this.props;
    const { prefixCls, fullscreen } = props;
    const options: React.ReactElement<any>[] = [];

    for (let index = 0; index < 12; index++) {
      options.push(<Option key={`${index}`}>{months[index]}</Option>);
    }

    return (
      <Select
        size={fullscreen ? 'default' : 'small'}
        dropdownMatchSelectWidth={false}
        className={`${prefixCls}-month-select`}
        value={String(month)}
        onChange={this.onMonthChange}
        getPopupContainer={() => this.calenderHeaderNode}
      >
        {options}
      </Select>
    );
  }

  onYearChange = (year: string) => {
    const newValue = this.props.value.clone();
    newValue.year(parseInt(year, 10));

    const onValueChange = this.props.onValueChange;
    if (onValueChange) {
      onValueChange(newValue);
    }
  }

  onMonthChange = (month: string) => {
    const newValue = this.props.value.clone();
    newValue.month(parseInt(month, 10));
    const onValueChange = this.props.onValueChange;
    if (onValueChange) {
      onValueChange(newValue);
    }
  }

  onTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onTypeChange = this.props.onTypeChange;
    if (onTypeChange) {
      onTypeChange(e.target.value);
    }
  }

  onClickBackwards = () => {
    const type = this.props.type;
    const newValue = this.props.value.clone();
    newValue.add(-1, type === 'date' ? 'month' : 'year');
    const onValueChange = this.props.onValueChange;
    if (onValueChange) {
      onValueChange(newValue);
    }
  }

  onClickForwards = () => {
    const type = this.props.type;
    const newValue = this.props.value.clone();
    newValue.add(1, type === 'date' ? 'month' : 'year');
    const onValueChange = this.props.onValueChange;
    if (onValueChange) {
      onValueChange(newValue);
    }
  }

  getCalenderHeaderNode = (node: HTMLDivElement) => {
    this.calenderHeaderNode = node;
  }

  getNavigation = () => {
    const { locale, showNavigation } = this.props;

    return showNavigation ? (
      <Group>
        <ButtonGroup>
          <Button onClick={this.onClickBackwards}>
            <Icon type="left" />
            {locale.navigationPlaceholder[0]}
          </Button>
          <Button onClick={this.onClickForwards}>
            {locale.navigationPlaceholder[1]}
            <Icon type="right" />
          </Button>
        </ButtonGroup>
      </Group>
    ): ''
  }

  render() {
    const { type, value, prefixCls, locale, fullscreen, hideTypeSwitch } = this.props;
    const yearSelect = this.getYearSelectElement(value.year());
    const monthSelect = type === 'date' ?
      this.getMonthSelectElement(value.month(), this.getMonthsLocale(value)) : null;
    const navigation = this.getNavigation();
    const size = (fullscreen ? 'default' : 'small') as any;
    const typeSwitch = ! hideTypeSwitch ? (
      <Group onChange={this.onTypeChange} value={type} size={size}>
        <RadioButton value="date">{locale.month}</RadioButton>
        <RadioButton value="month">{locale.year}</RadioButton>
      </Group>
    ) : null;

    return (
      <div className={`${prefixCls}-header`} ref={this.getCalenderHeaderNode}>
        {yearSelect}
        {monthSelect}
        {navigation}
        {typeSwitch}
      </div>
    );
  }
}
