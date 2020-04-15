<template>
    <div v-if="data.length">
    <ul>
      <li v-for="item in data">
        <img v-bind:src="item.image"> {{item.name}} 
        <!--v-bind : item의 attribute를 바인딩-->
      </li>
    </ul>
  </div>
  <div v-else>
    {{query}} 검색어로 찾을 수 없습니다
  </div>
</template>

<script>
export default {
    props: ['data', 'query'],
}
</script>