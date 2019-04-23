
import React from 'react';
import ReactDOM from 'react-dom';

import CusRouter from "./router/index"
import { LocaleProvider, message } from 'antd';
import {Provider} from "react-redux"
import zhCN from 'antd/lib/locale-provider/zh_CN';
import "antd/dist/antd.css";
import "./style/common.css"
import "./style/reset-antd.css"
import store from "./store/index"

ReactDOM.render(
	<LocaleProvider locale={zhCN}>
		<Provider store={store}>
			<CusRouter/>
		</Provider>
	</LocaleProvider>
	,
	document.getElementById('root')
);
