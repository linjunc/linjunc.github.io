---
title: ð¬ ä¸ºä»ä¹ CSS å¨ç»æ¯ JavaScript é«æï¼
date: 2021-8-1 23:40:41
id: 1635420521
photos: https://ljcimg.oss-cn-beijing.aliyuncs.com/img/cssvsjs.gif
tags:
  - JavaScript
  - CSS
categories:
  - [åç«¯æ»ç»,JavaScriptç²¾è¯»]
keywords: CSS,JavaScript,æçå¯¹æ¯
description: å¼è¨ è®²å°å¨ç»ï¼å½ç¶æ¯éå¸¸æææçå¦ï¼ä½ å¯ä»¥å¾ä¸æ»ä¸ä¸ï¼ççä¸é¢çå°é¢å¾ï¼æ¯ä¸æ¯ç¸å½çç«é·ï¼ä»¥ä¸ºææ¯ä»£ç ååºæ¥çåï¼
---


> ð¢ å¤§å®¶å¥½ï¼ææ¯å°ä¸åå­¦ï¼ä¸å<font color=#2e86de>åå¤§äºçåç«¯ç±å¥½è</font>
>
> ð¢ è¿ç¯æç« å°**æ¬¢å¿«ç**å¸¦ä½ äºè§£ä¸ä¸ CSS å JS å¨ç»çå·®å«
>
> ð¢ <font color=#f368e0>**æ¿ä½ å¿ äºèªå·±ï¼ç­ç±çæ´»**</font>

## å¼è¨

è®²å°å¨ç»ï¼å½ç¶æ¯éå¸¸æææçå¦ï¼ä½ å¯ä»¥å¾ä¸æ»ä¸ä¸ï¼ççä¸é¢çå°é¢å¾ï¼æ¯ä¸æ¯ç¸å½çç«é·ï¼ä»¥ä¸ºææ¯ä»£ç ååºæ¥çåï¼

é£å½ç¶ä¸å¯è½åï¼æè¿ä¹æ¸é±¼ï¼æä¹ä¼ä¸ºäºä¸ªå°é¢å¾ä¸å·å¢

åºè¯ä¸å¤è¯´ï¼å¶å®ä¸é¢çå¨å¾ç¨ä»£ç å®ç°ä¹ä¸ä¼å¾å°é¾ï¼è¿ä¸ªå¾æ¯ç¨ canva ååºæ¥çã

æ¬æä¸»è¦è®²ä»¥ä¸è¿äºåå®¹

1. æµè§å¨æ¸²ææµç¨
2. åæµåéç»
3. CSS å¨ç»
4. JS å¨ç»
5. ä¸¤èå¯¹æ¯

## ð 1. æµè§å¨çæ¸²ææµç¨

æ¸²ææµç¨ä¸»è¦æ4ä¸ªæ­¥éª¤

1. è§£æ HTML çæDOM æ 
2. è§£æ CSS æ ·å¼çæ CSSOM æ ï¼CSSOM æ ä¸ DOM æ ç»åçæ Render tree
3. å¸å± Render Tree å¯¹æ¯ä¸ªèç¹è¿è¡å¸å±å¤çï¼ç¡®å®å¨å±å¹ä¸çä½ç½®
4. ç»å¶ Render Treeï¼éåæ¸²ææ å°æ¯ä¸ªèç¹ç»å¶åºæ¥

ä¸ºäºä¼åç¨æ·ä½éªï¼æ¸²æå¼æä¸ä¼ç­å° HTML è§£æå®æåå»ºå¸å±æ¸²ææ 

### **çæ DOM æ **

DOM æ çæå»ºæ¯ä¸ä¸ªæ·±åº¦éåè¿ç¨ï¼ä¹å°±æ¯è¯´åªæå¨ææå­èç¹é½æå»ºå¥½åæä¼å»æå»ºå½åèç¹çä¸ä¸ä¸ªåå¼èç¹

### **çæ Render æ **

çæ DOM æ çåæ¶ä¼çæ CSSOM æ ï¼æ ¹æ® CSSOM å DOM æ æå»º Render Treeï¼æ¸²ææ åæ¬é¢è²ï¼å°ºå¯¸ç­æ¾ç¤ºå±æ§çç©å½¢

### **DOM æ å Render æ **

![image-20210822213018363](https://ljcimg.oss-cn-beijing.aliyuncs.com/img/image-20210822213018363.png)

## ð 2. åæµåéç»

CSS ä¸­è³å³éè¦çæ¦å¿µ

### åæµ

åæµä¹å«**éæ**ï¼æ**å ä½å±æ§**éè¦æ¹åçæ¸²æã

æ¯ä¸æ¬¡çåæµé½ä¼å°ç½é¡µåå®¹**éæ°æ¸²æ**ï¼åªæ¯æä»¬äººç¼æè§ä¸å°æä»»ä½ååï¼ä½æ¯å®ç¡®å®æ¯ä¼æ¸ç©ºé¡µé¢çï¼åä»é¡µé¢çå·¦ä¸è§çç¬¬ä¸ä¸ªåç´ ç¹ä»å·¦å°å³ä»ä¸å°ä¸è¿æ ·ä¸ç¹ä¸ç¹æ¸²æï¼æ¯æ¬¡åæµé½ä¼æ¯è¿æ ·çè¿ç¨ï¼åªæ¯æè§ä¸å°èå·²

> æ¸²ææ çèç¹åçæ¹åï¼å½±åäºè¯¥èç¹çå ä½å±æ§ï¼å¯¼è´è¯¥èç¹ä½ç½®åçååï¼æ­¤æ¶å°±ä¼è§¦åæµè§å¨åæµå¹¶éæ°çææ¸²ææ ã

å¸¸è§çå ä½å±æ§ï¼å¸å±ï¼å°ºå¯¸è¿äºå¯ä»¥ç¨å°ºå­éåºæ¥çå±æ§

- displayãfloatãgrid
- widthãpadding

ç­

### éç»

éç»ææ´æ¹**å¤è§å±æ§**èä¸å½±å**éåå±æ§**çæ¸²æï¼ç±»ä¼¼äºé¢è²è¿äºãç¸æ¯äºåæµï¼éç»çä½ç¨ä¸ä¼é£ä¹å¼ºçã

æ¸²ææ çèç¹åçæ¹åï¼ä½ä¸å½±åè¯¥èç¹çéåå±æ§ï¼åæµå¯¹æµè§å¨æ§è½çæ¶èæ¯è¿å¤§äºéç»çãå¹¶ä¸åæµå°±å¿ç¶å¸¦æ¥éç»ï¼éç»ä¸ä¸å®éè¦åæµ

**å¤è§å±æ§**

- clipï¼background
- text

ç­

å¨ä»ç»å®è¿äºç¥è¯åæä»¬æ¥èè CSS å¨ç»

## ð 3. CSS3 å¨ç»

è¿éæä»¬åªè°è®º CSS3 çå¨ç»

CSS3 å¨ç»ä¹è¢«ç§°ä¸ºè¡¥é´å¨ç»ï¼åå æ¯åªéè¦æ·»å å³é®å¸§çä½ç½®ï¼å¶ä»çæªå®ä¹çå¸§ä¼è¢«èªå¨çæ

å ä¸ºæä»¬åªè®¾ç½®äºå ä¸ªå³é®å¸§çä½ç½®ï¼æä»¥å¨è¿è¡å¨ç»æ§å¶çæ¶åæ¯è¾å°é¾ï¼ä¸è½ååè·¯æåå¨ç»ï¼æèå¨å¨ç»è¿ç¨ä¸­æ·»å ä¸äºå¶ä»æä½ï¼é½ä¸å¤§å®¹æ

ä½æ¯ CSS å¨ç»ä¹æå¾å¤çå¥½å¤

- æµè§å¨å¯ä»¥å¯¹å¨ç»è¿è¡ä¼å
- å¸§éä¸å¥½çæµè§å¨ï¼CSS3 å¯ä»¥èªç¶éçº§å¼å®¹
- ä»£ç ç®åï¼è°ä¼æ¹ååºå®

## ð 4. JS å¨ç»

é¦åï¼JS å¨ç»æ¯éå¸§å¨ç»ï¼å¨æ¶é´å¸§ä¸ç»å¶åå®¹ï¼ä¸å¸§ä¸å¸§çï¼æä»¥ä»çå¯åé æ§å¾é«ï¼å ä¹å¯ä»¥å®æä»»ä½ä½ æ³è¦çå¨ç»å½¢å¼ãä½æ¯ç±äºéå¸§å¨ç»çåå®¹ä¸ä¸æ ·ï¼ä¼å¢å å¶ä½çè´æï¼å ç¨æ¯è¾å¤§çèµæºç©ºé´ã

ä½æ¯å®ä¹æå¾å¤çä¼å¿

- ç»è»çå¨ç»
- å¯æ§æ§é«
- ç«é·é«çº§çå¨ç»

## ð¯ 5. CSS å¨ç»ä¸ JS å¨ç»å¯¹æ¯

åé¢å³äº CSS å¨ç»å JS å¨ç»ï¼é½æ¯ä¸äºæ¦å¿µæ§æ¯è¾å¼ºçä¸è¥¿ï¼ä¸çä¹ç½¢

è¯´äºè¿ä¹å¤ï¼å°åºä¸ºä»ä¹CSSå¨ç»è¦**æ´é«æ**å¢ï¼

### **ç¬¬ä¸ç¹**

ä»å®ç°å¨ç»çå¤æåº¦æ¥çï¼CSS å¨ç»å¤§å¤æ°é½æ¯è¡¥é´å¨ç»ï¼è JS å¨ç»æ¯éå¸§å¨ç»ãå½ç¶è¿éæä»¬ä¸è°è®ºå®ç°çææ

### **ç¬¬äºç¹**

ç¼ç çé«æï¼éç¨ JS å»å®ç°çå¨ç»ï¼æ è®ºå¤ç®åçå¨ç»ï¼é½éè¦å»æ§å¶æ´ä¸ªè¿ç¨ï¼å½ç¶ä½ å¯è½ä¼è¯´å¯ä»¥éç¨ä¸äºåºæ¥è§£å³è¿äºé®é¢ï¼ä½æ¯è¿äºåºçå®éè¿è¡å¯è½è¦æ¯åçå®ç°çæçè¦ä½çå¤

### **ç¬¬ä¸ç¹**

æ§è½çé«æï¼å¨æä»¬åé¢è®²å°äºåæµåéç»ï¼å¦ææä»¬è¦æä½ä¸ä¸ªåç´ åå³ç§»å¨ï¼æä»¬å¯è½éè¦æ§å¶ `dom.style.left` å±æ§ï¼æ¯æ¬¡æ¥**æ¹ååç´ çä½ç½®**ï¼èç»åæä»¬æè¯´çï¼**å ä½å±æ§**çæ¹åå¿ç¶ä¼å¼èµ·**åæµ**ï¼åæµå¿ç¶å¼èµ·éç»ï¼å¯æ³èç¥å¦ææä»¬éç¨ JS æ¥å®ç°å¨ç»ï¼è¿ä¸ªä»£ä»·æå¤å¤§ï¼è¿ä¼é ææµè§å¨å¨ä¸æ­çè®¡ç®é¡µé¢ï¼ä»èå¯¼è´æµè§å¨åå­å ç§¯ãåæ¶ç±äº JavaScript è¿è¡å¨æµè§å¨çä¸»çº¿ç¨ä¸­ï¼ä¸»çº¿ç¨ä¸­è¿æå¶ä»çéè¦ä»»å¡å¨è¿è¡ï¼å èå¯è½ä¼åå°å¹²æ°å¯¼è´**çº¿ç¨é»å¡**ï¼ä»è**ä¸¢å¸§**

è CSS çå¨ç»æ¯è¿è¡å¨åæçº¿ç¨ä¸­çï¼ä¸ä¼é»å¡ä¸»çº¿ç¨ï¼å¹¶ä¸å¨åæçº¿ç¨ä¸­å®æçå¨ä½ä¸ä¼è§¦ååæµåéç»

å½ç¶è¿æä¸ä¸ªéè¦çç¹ï¼JS å¨ç»è¿è¡å¨ CPUï¼è CSS å¨ç»è¿è¡å¨ GPU

æ»çæ¥è¯´ï¼ CSSå¨ç»çæ¸²æææ¬å°ï¼å¹¶ä¸å®çæ§è¡æçé«äº JavaScript å¨ç»

---

é£æä»¬ä»ä¹æ¶åä½¿ç¨ CSS å¨ç»ï¼ä»ä¹æ¶åä½¿ç¨ JS å¨ç»å¢ï¼

æä¸ªäººè§å¾

**åªè¦è½ç¨ CSS å®ç°çå¨ç»ï¼å°±ä¸è¦éç¨ JS å»å®ç°**ï¼å¯ä»¥å¤éç¨ CSS é¢å¤çå¨å»åæ´å¤å¤æçå¨ç»ï¼å°±åæä¹åç¨ SCSS åçæµæé¨å¨ç»ä¸æ ·

å¦æå¨ç»ç¸è¾å¤æï¼æä»¬å¯ä»¥éç¨ `JS + canvas` å»å°è¯ï¼è½ä¸è½å®ç°

æååèèçº¯ JS å®ç°

---

è¿ç¯æç« å¯è½è¿æå¾å¤å¼å¾æ¢è®¨çå°æ¹ï¼å¤§ä½¬ä»¬æä»ä¹çæ³æèä¸ä¸æ ·çè§è§£å¯ä»¥ä¸èµ·äº¤æµä»¥ä¸~

> éå¸¸æè°¢æ¨çéè¯»ï¼æ¬¢è¿æåºä½ çæè§ï¼æä»ä¹é®é¢æ¬¢è¿æåºï¼è°¢è°¢ï¼ð





