<template>
	<el-container class="pageroot">
		<el-aside width="200px">
			<el-menu default-active="1">
				<el-menu-item index="1">
					<i class="el-icon-setting"></i>
					<span slot="title">功能启用</span>
				</el-menu-item>
			</el-menu>
		</el-aside>
		<el-container>
			<el-main>
				<i-options></i-options>
			</el-main>
		</el-container>
	</el-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import iOptions from '../popup/root.vue'

export default {
	name: "root",
	data() {
		return {}
	},
	methods: {

	},
	components: {
		'i-options': iOptions
	},
}
</script>
<style lang="less">
body {
  margin: 0;
}
.pageroot {
  .el-menu {
    min-height: 100vh;
  }
}
</style>
