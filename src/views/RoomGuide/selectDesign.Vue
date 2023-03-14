<el-select
v-model="value"
class="m-2 material-icons col-4"
placeholder="location_on選取城市"
size="large"
>
<el-option
  v-for="item in options"
  :key="item.value"
  :label="item.label"
  :value="item.value"
/>
</el-select>