/// <reference types="react" />
import * as React from 'react';
export interface LocaleReceiverProps {
    componentName: string;
    defaultLocale: object | Function;
    children: (locale: object, localeCode?: string) => React.ReactElement<any>;
}
export interface LocaleReceiverContext {
    antLocale?: {
        [key: string]: any;
    };
}
export default class LocaleReceiver extends React.Component<LocaleReceiverProps> {
    static contextTypes: {
        antLocale: any;
    };
    context: LocaleReceiverContext;
    getLocale(): any;
    getLocaleCode(): any;
    render(): React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
}
