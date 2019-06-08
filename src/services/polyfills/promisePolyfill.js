import p from 'es6-promise';

export default () => {
    // ensuring promises work in internet explorer
    p.polyfill();
};