/// <reference types="react" />
import * as React from 'react';
import { Component } from 'react';
export interface ScrollNumberProps {
    prefixCls?: string;
    className?: string;
    count?: string | number;
    component?: string;
    onAnimated?: Function;
    style?: React.CSSProperties;
    title?: string | number;
}
export interface ScrollNumberState {
    animateStarted?: boolean;
    count?: string | number;
}
export default class ScrollNumber extends Component<ScrollNumberProps, ScrollNumberState> {
    static defaultProps: {
        prefixCls: string;
        count: null;
        onAnimated(): void;
    };
    lastCount: any;
    constructor(props: ScrollNumberProps);
    getPositionByNum(num: number, i: number): number;
    componentWillReceiveProps(nextProps: ScrollNumberProps): void;
    renderNumberList(position: number): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[];
    renderCurrentNumber(num: number, i: number): React.ReactElement<{
        className: string;
        style: {
            transition: string | boolean;
            msTransform: string;
            WebkitTransform: string;
            transform: string;
        };
        key: number;
    }, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
    renderNumberElement(): string | number | React.ReactElement<{
        className: string;
        style: {
            transition: string | boolean;
            msTransform: string;
            WebkitTransform: string;
            transform: string;
        };
        key: number;
    }, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>[] | undefined;
    render(): React.ComponentElement<any, React.Component<any, any, any>>;
}
