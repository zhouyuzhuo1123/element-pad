import Hello from '@/components/Hello.vue'
import Language from '@/components/language.vue'
import Upload from '@/components/upload.vue'
import Login from '@/components/login.vue'
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
    	]
	},
	{ path :'/login',component:Login}
]

export default routes
