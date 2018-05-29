<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>功能启用</span>
			<el-button v-if="!isOptions" @click="options" style="float: right; padding: 3px 0" type="text">选项</el-button>
		</div>
		<el-form label-width="120px">
			<el-form-item label="跨越">
				<el-switch v-model="cross"></el-switch>
			</el-form-item>
			<el-form-item v-show="cross" label="Cookie跨越">
				<el-switch v-model="credentials"></el-switch>
			</el-form-item>
			<el-form-item v-show="cross" label="跨越头">
				<el-select v-model="cross_header" multiple filterable allow-create default-first-option placeholder="跨越头">
					<el-option value="content-type"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="显示盗链图片">
				<el-switch v-model="referer"></el-switch>
			</el-form-item>
			<el-form-item v-show="referer" label="删除referer">
				<el-switch v-model="noreferer"></el-switch>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
import { mapState, mapActions } from "vuex";
import config from '../common/config.js';
import utils from '../common/utils.js'

export default {
	name: "root",
	data() {
		return {
			init: config
		}
	},
	computed: {
		...utils.syncValues(Object.keys(config)),
		isOptions() {
			return location.href.indexOf("options.html") >= 0
		}
	},
	methods: {
		options() {
			chrome.tabs.create({ url: 'pages/options.html' })
		}
	},
	components: {

	},
	mounted() {
		chrome.storage.sync.get(config, init => this.init = init);
		chrome.storage.onChanged.addListener(changes => {
			for (let key in changes) {
				var storageChange = changes[key];
				if (this.init[key] != storageChange.newValue)
					this.init[key] = storageChange.newValue
			}
		});
	}
}
</script>
