<script setup>
import { VPTeamMembers } from "vitepress/theme";
const members = [
  {
    avatar: "/avatar.jpg",
    name: "小丞同学",
    title: "Author",
    links: [
      { icon: "github", link: "https://github.com/linjunc" },
      {
        icon: 'twitter',
        link: "https://juejin.cn/user/1460594842018446",
      },
    ],
  },
];
</script>

<template>
  <VPTeamMembers size="small" :members="members" />
</template>
