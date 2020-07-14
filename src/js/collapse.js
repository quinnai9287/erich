function initCollapse(){

    const collapseShow = new Event('collapse.show'),
          collapseHide = new Event('collapse.hide');

    let toggle, collapseMenu;

    function setupItems(){

        toggle = document.getElementsByClassName('collapse');
        collapseMenu = document.getElementsByClassName('collapse-menu');

    }

    function setupEvents(){
        
        for(let i=0;i<collapseMenu.length;i++){

            collapseMenu[i].addEventListener('collapse.show', function (e) { 
                //console.log(e,'collpase show',this)
                console.log("this=",this)
                this.classList.add('active')


            }, false);

            collapseMenu[i].addEventListener('collapse.hide', function (e) { 
                //console.log(e,'collpase hide',this)
                this.classList.remove('active')

            }, false);

        }

    }

    function handleEvent(element){

        let collapsed = element.classList.contains("active")

        let target;
        let targetName = element.dataset.collapse

        if( targetName != "" && targetName != undefined ){

            target = element.dataset.collapse
            target = document.querySelector(target)


        }else{

            let elem = element.nextElementSibling
            target = elem.classList.contains('collapse-menu') ? elem : null

        }

        if(!collapsed){

            element.classList.add("active")
            target.dispatchEvent(collapseShow);

        }else{

            element.classList.remove("active")
            target.dispatchEvent(collapseHide);
        }

    }

    function addEventListener(){

        for(let i=0;i<toggle.length;i++){

            toggle[i].onclick = function(){ handleEvent(this) }

        }

    }

    function init(){

        setupItems()
        setupEvents()
        addEventListener()

    }

    init()
}

initCollapse()