"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./components/circle.js":
/*!******************************!*\
  !*** ./components/circle.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-draggable */ \"react-draggable\");\n/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_draggable__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction Circle(props) {\n    const [id, setId] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.id);\n    const [location, setLocation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([\n        props.x,\n        props.y\n    ]);\n    let displacement = [];\n    // function to update location\n    function handleStart(e) {\n        displacement = [\n            e.clientX,\n            e.clientY\n        ];\n    }\n    function handleStop(e) {\n        displacement = [\n            e.clientX - displacement[0],\n            e.clientY - displacement[1]\n        ];\n        setLocation([\n            location[0] + displacement[0],\n            location[1] + displacement[1]\n        ]);\n    }\n    // function to send updated location to database\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((react_draggable__WEBPACK_IMPORTED_MODULE_2___default()), {\n        onStart: handleStart,\n        onStop: handleStop,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"circle\", {\n            cx: props.x,\n            cy: props.y,\n            r: props.radius,\n            fill: props.color\n        }, void 0, false, {\n            fileName: \"/Users/cyclo/Documents/Programming/concept-map/components/circle.js\",\n            lineNumber: 24,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/cyclo/Documents/Programming/concept-map/components/circle.js\",\n        lineNumber: 23,\n        columnNumber: 9\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Circle);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2NpcmNsZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBc0M7QUFDRTtBQUV4QyxTQUFTRyxPQUFPQyxLQUFLLEVBQUU7SUFDbkIsTUFBTSxDQUFDQyxJQUFJQyxNQUFNLEdBQUdMLCtDQUFRQSxDQUFDRyxNQUFNQyxFQUFFO0lBQ3JDLE1BQU0sQ0FBQ0UsVUFBVUMsWUFBWSxHQUFHUCwrQ0FBUUEsQ0FBQztRQUFDRyxNQUFNSyxDQUFDO1FBQUVMLE1BQU1NLENBQUM7S0FBQztJQUMzRCxJQUFJQyxlQUFlLEVBQUU7SUFFckIsOEJBQThCO0lBQzlCLFNBQVNDLFlBQVlDLENBQUMsRUFBRTtRQUNwQkYsZUFBZTtZQUFDRSxFQUFFQyxPQUFPO1lBQUVELEVBQUVFLE9BQU87U0FBQztJQUN6QztJQUVBLFNBQVNDLFdBQVdILENBQUMsRUFBRTtRQUNuQkYsZUFBZTtZQUFDRSxFQUFFQyxPQUFPLEdBQUdILFlBQVksQ0FBQyxFQUFFO1lBQUVFLEVBQUVFLE9BQU8sR0FBR0osWUFBWSxDQUFDLEVBQUU7U0FBQztRQUN6RUgsWUFBWTtZQUFDRCxRQUFRLENBQUMsRUFBRSxHQUFHSSxZQUFZLENBQUMsRUFBRTtZQUFFSixRQUFRLENBQUMsRUFBRSxHQUFHSSxZQUFZLENBQUMsRUFBRTtTQUFDO0lBQzlFO0lBRUEsZ0RBQWdEO0lBR2hELHFCQUNJLDhEQUFDVCx3REFBU0E7UUFBQ2UsU0FBU0w7UUFBYU0sUUFBUUY7a0JBQ3JDLDRFQUFDRztZQUFPQyxJQUFJaEIsTUFBTUssQ0FBQztZQUFFWSxJQUFJakIsTUFBTU0sQ0FBQztZQUFFWSxHQUFHbEIsTUFBTW1CLE1BQU07WUFBRUMsTUFBTXBCLE1BQU1xQixLQUFLOzs7Ozs7Ozs7OztBQUdoRjtBQUVBLGlFQUFldEIsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL25leHQtYXBwLy4vY29tcG9uZW50cy9jaXJjbGUuanM/NmM1ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZX0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IERyYWdnYWJsZSBmcm9tICdyZWFjdC1kcmFnZ2FibGUnO1xuXG5mdW5jdGlvbiBDaXJjbGUocHJvcHMpIHtcbiAgICBjb25zdCBbaWQsIHNldElkXSA9IHVzZVN0YXRlKHByb3BzLmlkKTtcbiAgICBjb25zdCBbbG9jYXRpb24sIHNldExvY2F0aW9uXSA9IHVzZVN0YXRlKFtwcm9wcy54LCBwcm9wcy55XSk7XG4gICAgbGV0IGRpc3BsYWNlbWVudCA9IFtdO1xuXG4gICAgLy8gZnVuY3Rpb24gdG8gdXBkYXRlIGxvY2F0aW9uXG4gICAgZnVuY3Rpb24gaGFuZGxlU3RhcnQoZSkge1xuICAgICAgICBkaXNwbGFjZW1lbnQgPSBbZS5jbGllbnRYLCBlLmNsaWVudFldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0b3AoZSkge1xuICAgICAgICBkaXNwbGFjZW1lbnQgPSBbZS5jbGllbnRYIC0gZGlzcGxhY2VtZW50WzBdLCBlLmNsaWVudFkgLSBkaXNwbGFjZW1lbnRbMV1dXG4gICAgICAgIHNldExvY2F0aW9uKFtsb2NhdGlvblswXSArIGRpc3BsYWNlbWVudFswXSwgbG9jYXRpb25bMV0gKyBkaXNwbGFjZW1lbnRbMV1dKTtcbiAgICB9XG5cbiAgICAvLyBmdW5jdGlvbiB0byBzZW5kIHVwZGF0ZWQgbG9jYXRpb24gdG8gZGF0YWJhc2VcblxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPERyYWdnYWJsZSBvblN0YXJ0PXtoYW5kbGVTdGFydH0gb25TdG9wPXtoYW5kbGVTdG9wfT5cbiAgICAgICAgICAgIDxjaXJjbGUgY3g9e3Byb3BzLnh9IGN5PXtwcm9wcy55fSByPXtwcm9wcy5yYWRpdXN9IGZpbGw9e3Byb3BzLmNvbG9yfSAvPlxuICAgICAgICA8L0RyYWdnYWJsZT5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBDaXJjbGU7Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJEcmFnZ2FibGUiLCJDaXJjbGUiLCJwcm9wcyIsImlkIiwic2V0SWQiLCJsb2NhdGlvbiIsInNldExvY2F0aW9uIiwieCIsInkiLCJkaXNwbGFjZW1lbnQiLCJoYW5kbGVTdGFydCIsImUiLCJjbGllbnRYIiwiY2xpZW50WSIsImhhbmRsZVN0b3AiLCJvblN0YXJ0Iiwib25TdG9wIiwiY2lyY2xlIiwiY3giLCJjeSIsInIiLCJyYWRpdXMiLCJmaWxsIiwiY29sb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/circle.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_circle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/circle */ \"./components/circle.js\");\n/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-draggable */ \"react-draggable\");\n/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_draggable__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nlet data = [\n    {\n        id: 1,\n        x: 50,\n        y: 50,\n        radius: 15,\n        color: \"black\"\n    },\n    {\n        id: 2,\n        x: 100,\n        y: 100,\n        radius: 15,\n        color: \"black\"\n    }\n];\n// Renders all nodes\nfunction NodeLayout() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"svg\", {\n        width: \"100vw\",\n        height: \"100vh\",\n        children: data.map((entry)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_circle__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                id: entry.id,\n                x: entry.x,\n                y: entry.y,\n                radius: entry.radius,\n                color: entry.color\n            }, void 0, false, {\n                fileName: \"/Users/cyclo/Documents/Programming/concept-map/pages/index.js\",\n                lineNumber: 14,\n                columnNumber: 34\n            }, this))\n    }, void 0, false, {\n        fileName: \"/Users/cyclo/Documents/Programming/concept-map/pages/index.js\",\n        lineNumber: 13,\n        columnNumber: 9\n    }, this);\n}\nfunction App() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"App\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(NodeLayout, {}, void 0, false, {\n            fileName: \"/Users/cyclo/Documents/Programming/concept-map/pages/index.js\",\n            lineNumber: 22,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/cyclo/Documents/Programming/concept-map/pages/index.js\",\n        lineNumber: 21,\n        columnNumber: 9\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQTBCO0FBQ2U7QUFDRDtBQUV4QyxJQUFJRyxPQUFPO0lBQ1A7UUFBRUMsSUFBSTtRQUFHQyxHQUFHO1FBQUlDLEdBQUc7UUFBSUMsUUFBUTtRQUFJQyxPQUFPO0lBQVE7SUFDbEQ7UUFBRUosSUFBSTtRQUFHQyxHQUFHO1FBQUtDLEdBQUc7UUFBS0MsUUFBUTtRQUFJQyxPQUFPO0lBQVE7Q0FDdkQ7QUFFRCxvQkFBb0I7QUFDcEIsU0FBU0MsYUFBYTtJQUNsQixxQkFDSSw4REFBQ0M7UUFBSUMsT0FBTTtRQUFRQyxRQUFPO2tCQUNyQlQsS0FBS1UsR0FBRyxDQUFDLENBQUNDLHNCQUFVLDhEQUFDYiwwREFBTUE7Z0JBQUNHLElBQUlVLE1BQU1WLEVBQUU7Z0JBQUVDLEdBQUdTLE1BQU1ULENBQUM7Z0JBQUVDLEdBQUdRLE1BQU1SLENBQUM7Z0JBQUVDLFFBQVFPLE1BQU1QLE1BQU07Z0JBQUVDLE9BQU9NLE1BQU1OLEtBQUs7Ozs7Ozs7Ozs7O0FBR3ZIO0FBRWUsU0FBU08sTUFBTTtJQUMxQixxQkFDSSw4REFBQ0M7UUFBSUMsV0FBVTtrQkFDWCw0RUFBQ1I7Ozs7Ozs7Ozs7QUFHYixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbmV4dC1hcHAvLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBDaXJjbGUgZnJvbSBcIi4uL2NvbXBvbmVudHMvY2lyY2xlXCJcbmltcG9ydCBEcmFnZ2FibGUgZnJvbSBcInJlYWN0LWRyYWdnYWJsZVwiO1xuXG5sZXQgZGF0YSA9IFtcbiAgICB7IGlkOiAxLCB4OiA1MCwgeTogNTAsIHJhZGl1czogMTUsIGNvbG9yOiBcImJsYWNrXCIgfSxcbiAgICB7IGlkOiAyLCB4OiAxMDAsIHk6IDEwMCwgcmFkaXVzOiAxNSwgY29sb3I6IFwiYmxhY2tcIiB9XG5dO1xuXG4vLyBSZW5kZXJzIGFsbCBub2Rlc1xuZnVuY3Rpb24gTm9kZUxheW91dCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8c3ZnIHdpZHRoPVwiMTAwdndcIiBoZWlnaHQ9XCIxMDB2aFwiPlxuICAgICAgICAgICAge2RhdGEubWFwKChlbnRyeSkgPT4gPENpcmNsZSBpZD17ZW50cnkuaWR9IHg9e2VudHJ5Lnh9IHk9e2VudHJ5Lnl9IHJhZGl1cz17ZW50cnkucmFkaXVzfSBjb2xvcj17ZW50cnkuY29sb3J9IC8+KX1cbiAgICAgICAgPC9zdmc+XG4gICAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXBwXCI+XG4gICAgICAgICAgICA8Tm9kZUxheW91dCAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufSJdLCJuYW1lcyI6WyJSZWFjdCIsIkNpcmNsZSIsIkRyYWdnYWJsZSIsImRhdGEiLCJpZCIsIngiLCJ5IiwicmFkaXVzIiwiY29sb3IiLCJOb2RlTGF5b3V0Iiwic3ZnIiwid2lkdGgiLCJoZWlnaHQiLCJtYXAiLCJlbnRyeSIsIkFwcCIsImRpdiIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-draggable":
/*!**********************************!*\
  !*** external "react-draggable" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("react-draggable");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();