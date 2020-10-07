
// Como pegar cidade e estado
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
    .then(res => res.json())
    .then(states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}


populateUFs()

function getCidade(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    citySelect.innerHTML = " <option value>Selecione a cidade</option>"
    citySelect.disabled = true


    fetch(url)
    .then(res => res.json())
    .then(cities => {


        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled =false
    })

}


document
    .querySelector("select[name=uf]")
    .addEventListener("change" , getCidade)


    //itens de coleta 
    // pegar todas <li>
    const itemsToCollect = document.querySelectorAll(".itens-grid li")

    for(const item of itemsToCollect){
        item.addEventListener("click", handleSelectedItem)
    }

   const collectedItems = document.querySelector("input[name=items]")


    //Quais itens selecionados
    let selectedItems = []

    function handleSelectedItem(event){
        const itemLi= event.target

                // add or remove com uma classe js
                itemLi.classList.toggle("selected")

        const itemId = itemLi.dataset.id

        console.log('Item ID: ', itemId)


        // verificar se o array está preenchido  , se sim ele vai manipular os arquivos

        const alreadySelected = selectedItems.findIndex( item => {
            const itemFound = item == itemId // True or false

            return itemFound
        })


        // Se estiver selecionado  , retira da seleção
        if(alreadySelected >= 0){
            //tira sa seleção
            const filteredItems = selectedItems.filter(item =>{
                const itemIsDiferrent = item != itemId
                return itemIsDiferrent
            })

            selectedItems = filteredItems
        }else{
                 // se nao tiver selecionado adicionar a selecao
                 // adicionar à seleção
                 selectedItems.push(itemId)

        }

        console.log('selectedItem: ', selectedItems)

        //Atualizar  o campo  escondido  com os  dados selecionado
        collectedItems.value = selectedItems
    }