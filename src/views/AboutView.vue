<template>
  <div>
   <br>
   <h1>{{ appName }}</h1>
   <h2>v{{ appVersion }}</h2>
   <p>Designed and developed by {{ developer }}</p>
   <p>{{ email }}</p>
 </div>
</template>
<script>
export default {
 data() {
   return {
     appName: 'Orhestrator Web Server',
     appVersion: '1.0.0',
     developer: 'Nicolas Hernandez',
     email: 'nicolas.hernandezpaez@orange.com',
   }
 },
}
</script>

