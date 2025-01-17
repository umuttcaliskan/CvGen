declare module 'react-native-html-to-pdf' {
  interface Options {
    html: string;
    fileName?: string;
    directory?: string;
    base64?: boolean;
    height?: number;
    width?: number;
    padding?: number;
  }

  interface Response {
    filePath: string;
    base64?: string;
  }

  const RNHTMLtoPDF: {
    convert: (options: Options) => Promise<Response>;
  };
  
  export default RNHTMLtoPDF;
}

declare module 'react-native-view-pdf' {
  import { Component } from 'react';
  import { StyleProp, ViewStyle } from 'react-native';

  interface Props {
    resource: string;
    resourceType?: 'url' | 'base64' | 'file';
    style?: StyleProp<ViewStyle>;
    onLoad?: () => void;
    onError?: (error: Error) => void;
  }

  export default class PDFView extends Component<Props> {}
} 