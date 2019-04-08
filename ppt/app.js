
new Vue({
    el:'#ppt',
    date(){
        return {
            pages:JSON.parse(localStorage.getItem('pages'))||[],
            selectedId:localStorage.getItem('selected-id')||null,
        }
    }
})