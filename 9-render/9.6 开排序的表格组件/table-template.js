Vue.component('tTable',{
    props:{
        data:{
            type:Array,
            default:function(){
                return [];
            }
        },
        columns:{
            type:Array,
            default:function(){
                return [];
            }
        },
        width:{
            type:Number,
            default:100
        }
    },
    data:function(){
        return {
            currentColumns:[],
            currentData:[]
        }
    },
    //--------------------col_width 改 width
    template:`
        <table>
            <colgroup :span="currentColumns.length" :style="{'width':width+'px'}"></colgroup>
            <tr>
                <th v-for="column,index in currentColumns">
                    {{column.title}}
                    <a v-if="column.sortable" :class="{'on':column._sortType==='asc'}" @click="handleSortByAsc(index)">↑</a>
                    <a v-if="column.sortable" :class="{'on':column._sortType==='desc'}" @click="handleSortByDesc(index)">↓</a>
                </th>
            </tr>
            <tbody>
                <tr v-for="row in currentData">
                    <td v-for="value in currentColumns">{{row[value.key]}}</td>
                </tr>
            </tbody>
        </table>
    `,
    watch:{
        // 添加数据时，data 改变，currentData
        data:function(){
            this.makeData();
            //处理排序问题
            var sortedColumn = this.currentColumns.filter(function(col){
                return col._sortType!=='normal';
            });

            if(sortedColumn.length>0){
                if(sortedColumn[0]._sortType==='asc'){
                    this.handleSortByAsc(sortedColumn[0]._index);
                }else{
                    this.handleSortByDesc(sortedColumn[0]._index);
                }
            }
        }
    },
    methods:{
        makeColumns(){
            this.currentColumns=this.columns.map(function(col,index){
                col._sortType='normal';
                col._index=index;
                return col;
            });
        },
        makeData(){
            this.currentData=this.data.map(function(row,index){
            row._index=index;
            return row;
            });
        },
        //  升序
        handleSortByAsc(index){
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function(col){
                col._sortType='normal';
            });
            this.currentColumns[index]._sortType='asc';
            this.currentData.sort(function(a,b){
                return a[key] < b[key]  ? -1 : 1 ;
            });
        },
        //  降序
        handleSortByDesc(index){
            var key = this.currentColumns[index].key;
            this.currentColumns.forEach(function(col){
                col._sortType='normal';
            });
            this.currentColumns[index]._sortType='desc';
            this.currentData.sort(function(a,b){
                return a[key] < b[key]  ? 1 : -1 ;
            });
        }
    },

    mounted:function(){
        //数据组织
        this.makeColumns();
        this.makeData();
    }
})