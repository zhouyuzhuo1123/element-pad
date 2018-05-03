import Hello from '@/components/Hello.vue'
import Language from '@/components/language.vue'
import Upload from '@/components/upload.vue'
import pageList from '@/components/pageList.vue'
import widgetDetail from '@/components/widgetDetail.vue'
import Login from '@/components/login.vue'
import Test from '@/components/test.vue'
import interFace from '@/components/interface/index.vue'
import interfaceList from '@/components/interfaceList/index.vue'


const routes = [
  { path: '/', component: Hello ,
  	children: [
      {
        path: 'interFace',
        component: interFace
      },
      { 
      	path: '/interfaceList',
      	component: interfaceList
     	},
     	{ path: '/language', component: Language },
     	{ path: '/upload', component: Upload },
     	{ path: '/pageList', component: pageList },
     	{ path: '/test', component: Test },
     	{ path: '/widget', component: widgetDetail },
  	]
	},
	{ path :'/login',component:Login}
]

export default routes
