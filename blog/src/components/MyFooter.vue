<template>
  <div class="footer">
    <p>Copyright © 2022 xxxx</p>
    <p>
      <a href="https://beian.miit.gov.cn/" class="font-xk">xxx备案号</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
};
</script>

<style lang='less' scoped>
.footer {
  margin-top: 100px;
  padding-top: 15px;
  height: 100px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  p {
    font-family: Arial, Helvetica, sans-serif;
    padding-top: 5px;
    a {
      font-size: 14px;
      color: #fff;
      &:hover {
        color: orangered;
      }
    }
  }
}
</style>