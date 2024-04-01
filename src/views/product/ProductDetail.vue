<script setup lang="ts">
import {ref, computed} from "vue"
import {router} from '../../router'
import {Back} from "@element-plus/icons-vue"
import {addStock, getProductById} from "../../api/product.ts"
import {parseCategory} from "../../utils"

const role = sessionStorage.getItem("role")

const productId = Number(router.currentRoute.value.params.productId)
const actualStoreId = Number(sessionStorage.getItem("storeId"))
const productVO = ref()
const storeId = ref(0)
const name = ref('')
const photoUrlList = ref([])
const stock = ref(0)
const category = ref('')
const price = ref(0)

const addStockNumber = ref()

const hasAddStockInput = computed(() => addStockNumber.value != null)
const addStockDisabled = computed(() => {
  return !(hasAddStockInput.value)
})

getProductDetail()

function getProductDetail() {
  getProductById(productId).then(res => {
    productVO.value = res.data.result
    storeId.value = productVO.value.storeId
    name.value = productVO.value.name
    photoUrlList.value = productVO.value.photoUrlList
    stock.value = productVO.value.stock
    category.value = productVO.value.category
    price.value = productVO.value.price

    console.log(storeId)
    console.log(actualStoreId)
  })
}

// 添加库存按钮
function AddStock() {
  addStock(productId, addStockNumber.value).then(res => {
    if (res.data.code === '000') {
      ElMessage({
        message: '添加库存成功！',
        type: 'success',
        center: true,
      })
      addStockNumber.value = null
      getProductDetail()
    } else if (res.data.code === '400') {
      ElMessage({
        message: res.data.msg,
        type: 'error',
        center: true,
      })
    }
  })
}

function toBackPage() {
  router.push("/storeDetail/" + storeId.value)
}
</script>


<template>
  <el-container>
    <el-aside width="25%" class="page-aside">
      <div class="product-detail-aside">
        <el-button @click="toBackPage()"
                   type="primary" circle plain class="back-button">
          <el-icon>
            <Back/>
          </el-icon>
        </el-button>

        <el-carousel trigger="click" arrow="always" indicator-position="outside">
          <el-carousel-item v-for="item in photoUrlList" :key="item">
            <el-image class="logo-image" :src="item" />
          </el-carousel-item>
        </el-carousel>

        <span class="product-title">{{ name }}</span>

        <el-descriptions :column="1">
          <el-descriptions-item style="font-size: 10px" label="品类">
            {{ parseCategory(category) }}
          </el-descriptions-item>

          <el-descriptions-item style="font-size: 10px" label="价格">
            {{ price }} 元
          </el-descriptions-item>

          <el-descriptions-item style="font-size: 10px" label="库存">
            {{ stock }} 件
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-aside>

    <el-main>
<!--      对于顾客，他可以在这里拥有一个创建订单按钮，点击后创建订单，弹出一个订单的弹窗。-->
<!--      他可以在弹窗中查看订单详情，并支付订单；也可以关闭弹窗，之后再在订单列表界面支付那个订单。-->
<!--      我们期待你在这里做一个弹窗，学会弹窗的用法。-->
<!--      当然，有其他形式的实现也可以。-->

      <div v-if="role === 'STAFF' && storeId === actualStoreId">
        <div>
          <span class="main-title">添加库存</span>
        </div>
        <div class="add-stock-main">
          <el-input class="add-stock-number-input"
                    v-model="addStockNumber" placeholder="请输入添加库存数">
            <template #append>件</template>
          </el-input>
          <br>
          <el-button @click="AddStock" :disabled="addStockDisabled"
                     class="add-stock-button" type="primary" plain>
            新增库存
          </el-button>
        </div>
      </div>
    </el-main>
  </el-container>
</template>


<style scoped>
.page-aside {
  border-right: lightgrey solid 1px;
}

.back-button {
  margin-top: 20px;
  margin-bottom: 20px;
}

.product-title {
  font-size: 30px;
  margin-bottom: 20px;
}

.product-detail-aside {
  width: 80%;
  margin-left: 10%;
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.logo-image {
  width: 100%;
}

.add-stock-number-input {
  width: 300px;
  margin-bottom: 20px;
}

.add-stock-button {
  margin-bottom: 40px;
}

.main-title {
  font-size: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 20px;
}

.add-stock-main {
  margin-top: 20px;
  margin-left: 30px;
}
</style>
