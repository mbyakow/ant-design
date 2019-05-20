import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as React from 'react';
import { PREFIX_CLS } from './Constants';
import Select from '../select';
import { Group, Button as RadioButton } from '../radio';
import Icon from '../icon';
import ButtonGroup from '../button/button-group';
import Button from '../button/button';
var Option = Select.Option;

var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        _classCallCheck(this, Header);

        var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));

        _this.onYearChange = function (year) {
            var newValue = _this.props.value.clone();
            newValue.year(parseInt(year, 10));
            var onValueChange = _this.props.onValueChange;
            if (onValueChange) {
                onValueChange(newValue);
            }
        };
        _this.onMonthChange = function (month) {
            var newValue = _this.props.value.clone();
            newValue.month(parseInt(month, 10));
            var onValueChange = _this.props.onValueChange;
            if (onValueChange) {
                onValueChange(newValue);
            }
        };
        _this.onTypeChange = function (e) {
            var onTypeChange = _this.props.onTypeChange;
            if (onTypeChange) {
                onTypeChange(e.target.value);
            }
        };
        _this.onClickBackwards = function () {
            var type = _this.props.type;
            var newValue = _this.props.value.clone();
            newValue.add(-1, type === 'date' ? 'month' : 'year');
            var onValueChange = _this.props.onValueChange;
            if (onValueChange) {
                onValueChange(newValue);
            }
        };
        _this.onClickForwards = function () {
            var type = _this.props.type;
            var newValue = _this.props.value.clone();
            newValue.add(1, type === 'date' ? 'month' : 'year');
            var onValueChange = _this.props.onValueChange;
            if (onValueChange) {
                onValueChange(newValue);
            }
        };
        _this.getCalenderHeaderNode = function (node) {
            _this.calenderHeaderNode = node;
        };
        _this.getNavigation = function () {
            var _this$props = _this.props,
                locale = _this$props.locale,
                showNavigation = _this$props.showNavigation;

            return showNavigation ? React.createElement(
                Group,
                null,
                React.createElement(
                    ButtonGroup,
                    null,
                    React.createElement(
                        Button,
                        { onClick: _this.onClickBackwards },
                        React.createElement(Icon, { type: 'left' }),
                        locale.navigationPlaceholder[0]
                    ),
                    React.createElement(
                        Button,
                        { onClick: _this.onClickForwards },
                        locale.navigationPlaceholder[1],
                        React.createElement(Icon, { type: 'right' })
                    )
                )
            ) : '';
        };
        return _this;
    }

    _createClass(Header, [{
        key: 'getYearSelectElement',
        value: function getYearSelectElement(year) {
            var _this2 = this;

            var _props = this.props,
                yearSelectOffset = _props.yearSelectOffset,
                yearSelectTotal = _props.yearSelectTotal,
                locale = _props.locale,
                prefixCls = _props.prefixCls,
                fullscreen = _props.fullscreen,
                defaulValue = _props.defaulValue;

            var start = defaulValue.year() - yearSelectOffset;
            var end = start + yearSelectTotal;
            var suffix = locale.year === '年' ? '年' : '';
            var options = [];
            for (var index = start; index < end; index++) {
                options.push(React.createElement(
                    Option,
                    { key: '' + index },
                    index + suffix
                ));
            }
            return React.createElement(
                Select,
                { size: fullscreen ? 'default' : 'small', dropdownMatchSelectWidth: false, className: prefixCls + '-year-select', onChange: this.onYearChange, value: String(year), getPopupContainer: function getPopupContainer() {
                        return _this2.calenderHeaderNode;
                    } },
                options
            );
        }
    }, {
        key: 'getMonthsLocale',
        value: function getMonthsLocale(value) {
            var current = value.clone();
            var localeData = value.localeData();
            var months = [];
            for (var i = 0; i < 12; i++) {
                current.month(i);
                months.push(localeData.months(current));
            }
            return months;
        }
    }, {
        key: 'getMonthSelectElement',
        value: function getMonthSelectElement(month, months) {
            var _this3 = this;

            var props = this.props;
            var prefixCls = props.prefixCls,
                fullscreen = props.fullscreen;

            var options = [];
            for (var index = 0; index < 12; index++) {
                options.push(React.createElement(
                    Option,
                    { key: '' + index },
                    months[index]
                ));
            }
            return React.createElement(
                Select,
                { size: fullscreen ? 'default' : 'small', dropdownMatchSelectWidth: false, className: prefixCls + '-month-select', value: String(month), onChange: this.onMonthChange, getPopupContainer: function getPopupContainer() {
                        return _this3.calenderHeaderNode;
                    } },
                options
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                type = _props2.type,
                value = _props2.value,
                prefixCls = _props2.prefixCls,
                locale = _props2.locale,
                fullscreen = _props2.fullscreen,
                hideTypeSwitch = _props2.hideTypeSwitch;

            var yearSelect = this.getYearSelectElement(value.year());
            var monthSelect = type === 'date' ? this.getMonthSelectElement(value.month(), this.getMonthsLocale(value)) : null;
            var navigation = this.getNavigation();
            var size = fullscreen ? 'default' : 'small';
            var typeSwitch = !hideTypeSwitch ? React.createElement(
                Group,
                { onChange: this.onTypeChange, value: type, size: size },
                React.createElement(
                    RadioButton,
                    { value: 'date' },
                    locale.month
                ),
                React.createElement(
                    RadioButton,
                    { value: 'month' },
                    locale.year
                )
            ) : null;
            return React.createElement(
                'div',
                { className: prefixCls + '-header', ref: this.getCalenderHeaderNode },
                yearSelect,
                monthSelect,
                navigation,
                typeSwitch
            );
        }
    }]);

    return Header;
}(React.Component);

export default Header;

Header.defaultProps = {
    prefixCls: PREFIX_CLS + '-header',
    yearSelectOffset: 2,
    yearSelectTotal: 5
};