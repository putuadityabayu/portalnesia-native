import {Alert} from 'react-native'
import {openBrowserAsync} from 'expo-web-browser'
import i18n from 'i18n-js'

export const clean=(text: string)=>{
    text=text.replace(/<script[^>]*>([\s\S]*?)<\/script[^>]*>/i, '').replace(/(<([^>]+)>)/ig,""); 
    return text;
}
  
export const isEmptyObj=(obj: Record<string,any>)=>{
    for(let key in obj) {
        if(obj.hasOwnProperty(key)) return false;
    }
    return true;
}

export const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
]

export const monthNamesEn=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const escapeHTML=(text: string,withQuote?: boolean)=>{
    if(typeof text!=='string' || text.match(/\S/) === null) return '';
    let map: Record<string,string>;
    const quote=withQuote||true;
    if(quote) {
      map  = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
    } else {
      map  = {
        '&': '&',
        '<': '&lt;',
        '>': '&gt;',
        '"': '"',
        "'": "'"
      };
    }
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }

export const stripHTML=(text='')=>{
    if(typeof text!=='string' || text.match(/\S/) === null) return '';
    return text.replace(/<[^>]*>?/gm,'').replace(/\&\#xA0\;/gm,' ');
}
  
export const specialHTML=(text: string)=>{
    if(typeof text!=='string' || text.match(/\S/) === null) return '';
    const map: Record<string,string> = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      "&#039;": "'",
      "&nbsp;":" "
    };
    return text.replace(/(\&amp\;|\&lt\;|\&gt\;|\&quot\;|\&\#039\;|\&nbsp\;)/g, function(m){
        return map[m];
    });
}

export const parseURL=(url: string)=>{
    if(typeof url!=='string') return '';
    const parser=new URL((url.match(/http(s)?/)?url:`http://${url}`));
    const parserr=`${parser.hostname}${parser.pathname}${parser.search}`;
    return parserr.replace("www.", "");
}

export const ucwords=function(text: string,func?: (value: string)=>void){
    if(typeof text!=='string') return '';
    const str=text.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    if(typeof func === 'function') return func(str);
    else return str;
}

export const jsStyles=function(text: string,func?: (value: string)=>void){
    if(typeof text!=='string') return '';
    let str=text.toLowerCase();
    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;-";
    const to   = "aaaaeeeeiiiioooouuuunc       ";
    for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str.replace(/\./g," ")
    str=str.replace(/\b[a-z]/g, function(p1) {
        return p1.toUpperCase()
    });
    str=str.replace(/^\b[A-Z]/g, function(p1) {
        return p1.toLowerCase()
    });
    str=str.replace(/\s/g,"")
    if(typeof func === 'function') return func(str);
    else return str;
} 

export const firstLetter=function(text: string,number?: number,func?: (value: string)=>void){
    if(typeof text!=='string') return '';
    let str=text.toLowerCase().replace(/\b([a-z])(\S*)/g, function(a,b) {
        return b.toUpperCase();
    }).replace(/\s/g,"");
    if(typeof number==='number') str=str.substring(0,number);
    if(typeof func === 'function') return func(str);
    else return str;
}

export const urlToDomain=function(url: string){
    let parser=new URL((url.match(/http(s)?/)?url:`http://${url}`));
    const parserr=parser.hostname;
    return parserr.replace("www.", "");
}
  
export const replaceAt=function(text: string,index: number, replacement: string) {
    return text.substr(0, index) + replacement+ text.substr(index + replacement.length);
};
  
export const Ktruncate=function(text: string,num: number) {
    if(typeof text!=='string') return '';
    return (text.length <= num)?text:text.slice(0, num) + '...';
};
  
export const splice = function(text: string,idx: number, rem: number, str: string) {
    if(typeof text!=='string') return '';
    return text.slice(0, idx) + str + text.slice(idx + Math.abs(rem));
};

export const PNslug = function (text:string,func?: (value: string)=>void,lowercase?:boolean) {
    if(typeof text!=='string') return '';
    lowercase=typeof lowercase==='boolean'&&lowercase===true;
    let str,t=text;
    //return new Promise(function(resolve,reject){
      //if(typeof func === 'undefined') str=t.replace(/^\s+|\s+$/g, '').toLowerCase();
      //else str = t.toLowerCase();
      str = lowercase ? t.toLowerCase() : t;
          
      // remove accents, swap ñ for n, etc
      const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      const to   = "aaaaeeeeiiiioooouuuunc------";
      for (var i=0, l=from.length ; i<l ; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }
      const res=str.replace(/^(-|\s| )]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
      if(typeof func === 'function') return func(res);
      else return res
};

export const number_size=(bytes: number,precision=2)=>{
    if(typeof bytes !== 'number' || bytes===0 || bytes===null) return '-';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    bytes=Math.max(bytes,0);
    let pow = Math.floor((bytes ? Math.log(bytes) : 0) / Math.log(1024));
    pow = Math.min(pow, units.length - 1);
    bytes /= Math.pow(1024, pow);
    const factorOfTen = Math.pow(10, precision)
    const parsed=Math.round(bytes * factorOfTen) / factorOfTen
    //const parsed=Number(Math.round(bytes + "e" + decimalPlaces) + "e-" + precision)
    return parsed+' '+units[pow];
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
export const generateRandom=(number=10)=>{
    let result='';
    const charLength = CHARS.length;
    for (let i = 0; i < number; i++) {
        result += CHARS.charAt(Math.floor(Math.random() * charLength))
    }
    return result;
}

export const time_ago=(seconds: number|string)=>{
    const sec = Number(seconds);
    let interval = Math.floor(sec / 31536000);
    if (interval > 1) {
        return interval + " years ago";
    }
    interval = Math.floor(sec / 2592000);
    if (interval > 1) {
        return interval + " months ago";
    }
    interval = Math.floor(sec / 86400);
    if (interval > 1) {
        return interval + " days ago";
    }
    interval = Math.floor(sec / 3600);
    if (interval > 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(sec / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return "less minutes ago";
}

export const acronym=(text: string,length?:number)=>{
    let a='',len=length||2;
    const aa = text.split(/\s/);
    for(let i=0;i< aa.length && i<len;i++){
      a+=aa[i].charAt(0).toUpperCase();
    }
    return a;
}
  
export const separateNumber=(angka:number)=>{
    try {
      if(angka==0) return '0';
      const num = angka.toString().split(".")
      num[0] = num[0].replace(/\B(?=(\d{3})+(?!\d))/g,",")
      return num.join(".")
    } catch(err) {
      return '0';
    }
}
  
export const addslashes=(str:string)=>{
    return (str + '')
      .replace(/[\\"']/g, '\\$&')
      .replace(/\u0000/g, '\\0')
}
  
export const adddesc=(str:string)=>str.replace(/\s+/,' ').replace('"','\"')

export function listToMatrix(list: never[], elementsPerSubArray: number) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }

    return matrix;
}

export const extractMeta=(file: string)=>{
    const fileName = file.split("/").pop();
    const files = fileName||file
    const match = /\.(\w+)$/.exec(files);
    return {name:fileName,match}
}

export const openBrowser=(url: string,alert=true)=>{
    if(alert) {
        Alert.alert(
            i18n.t('title_external_link'),
            i18n.t('desc_external_link'),
            [{
                text:i18n.t('cancel'),
                onPress:()=>{}
            },{
                text:i18n.t("open"),
                onPress:()=>{
                        openBrowserAsync(url,{
                        enableDefaultShareMenuItem:true,
                        toolbarColor:'#2f6f4e',
                        showTitle:true
                    })
                }
            }]
        )
    } else {
        openBrowserAsync(url,{
            enableDefaultShareMenuItem:true,
            toolbarColor:'#2f6f4e',
            showTitle:true
        })
    }
    
}

export const randomInt=(total=2)=>Math.floor(Math.random() * total);