import React from 'react';

export const appPage = (constructor: Function) => {
    console.log('类装饰器')
    console.log(constructor, '>>>>>>>>>');
}

// export const appPage = (WrappedComponent) => {
//     class PageWrapper extends React.Component<any, any>{
//         constructor(props, context) {
//             super(props);
//         }
//         render(){
//             return (
//                 <div>
//                     <p>装饰器内容</p>
//                     {WrappedComponent}
//                 </div>
//             )
//         }
//     }
//     return PageWrapper as any;
// }