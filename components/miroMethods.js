const fetch = require("node-fetch");
const token = require('../oauth.json');
const { config } = require("process");
async function createBoard(name, desc){
    const options = {

        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token.key
        },
        
        body: JSON.stringify({
            name: name,
            description: desc,
            sharingPolicy: {access: 'private', teamAccess: 'private'},
            permissionsPolicy: {copyAccessLevel: 'team_editors'}
        })
        };
        
        console.log(options.body);
        
        var response = new Promise(async function(resolve, reject){
            fetch('https://api.miro.com/v2/boards', options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                resolve(response);
            })
            .catch(err => {
                console.error(err)
                reject(err)
            });
          })
        return response  
}

async function listBoardsAsTeam(){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token.key
        }
      };
      
      var response = new Promise(async function(resolve, reject){
        fetch('https://api.miro.com/v2/boards?sort=alphabetically&limit=20&offset=0', options)
        .then(response => response.json())
        .then(response => {
            if(response === []){
                reject("Response blank")
                return
            } 
            console.log(response);
            resolve(response);
        })
        .catch(err => {
            console.error(err)
            reject(err)
        });
      });
    return response
};
async function getBoard(id){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token.key
        }
      };
      
      fetch('https://api.miro.com/v2/boards/' + id, options)
        .then(response => {
            if(response === []){
                reject("Blank")
            }
        response.json()
        .then(response => console.log(response))
        .catch(err => console.error(err));
    })
}

async function copyBoard(){
    const options = {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.key
        },
        body: JSON.stringify({
          name: 'untitled',
          sharingPolicy: {access: 'private', teamAccess: 'private'},
          permissionsPolicy: {copyAccessLevel: 'team_editors'}
        })
      };
      
      fetch('https://api.miro.com/v2/boards', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

async function updateBoard(){
    const options = {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.key
        },
        body: JSON.stringify({
          name: 'sample_boardname_update',
          description: 'Sample description update',
          sharingPolicy: {access: 'private', teamAccess: 'private'},
          permissionsPolicy: {copyAccessLevel: 'team_editors'}
        })
      };
      
      fetch('https://api.miro.com/v2/boards/board_id', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

async function deleteBoard(id){
    const options = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token.key
        }
      };
      var response = new Promise(async function(resolve, reject){
        fetch('https://api.miro.com/v2/boards/' + id, options)
        .then(response => response.text()).then(response => {
            if(response === []){
                reject("Response blank")
                return
            } 
            console.log(response);
            resolve(response);
        })
        .catch(err => {
            console.error(err)
            reject(err);
        });
      });
    return response;
}



async function listBoardMembers(){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token.key
        }
      };
      
      fetch('https://api.miro.com/v2/boards/board_id/members?limit=20&offset=0', options)
        .then(response => {
            if(response === []){
                reject("Blank")
            }
            response.json()
        })
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

async function getBoardMember(){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token.key
        }
      };
      
      fetch('https://api.miro.com/v2/boards/board_id/members/member_id', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

async function getItemsOnBoard(id){
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token.key
        }
      };
      var response = new Promise(async function(resolve, reject){
        fetch('https://api.miro.com/v2/boards/' + id + '/widgets?limit=10', options)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            resolve(response);
        })
        .catch(err => {
            console.error(err)
            reject(err);
        });
      });
      return response;
}

async function getItemOnBoard(){const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token.key
    }
  };
  
  fetch('https://api.miro.com/v2/boards/board_id/widgets/widget_id', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

async function updateItemPosition(){
    const options = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.key
    },
    body: JSON.stringify({x: 0, y: 0})
  };
  
  fetch('https://api.miro.com/v2/boards/board_id/widgets/widget_id/position', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
}

async function deleteItem(boardid, id){
    const options = {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token.key
        }
      };
      
      fetch('https://api.miro.com/v2/boards/' + boardid + '/widgets/' + id, options)
        .then(response => {
            console.log(response)
            response.json()
        })
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

async function createCardItem(id, title, content, [x, y] = [0, 0]){
    const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.key
    },
    body: JSON.stringify({
      data: {
        title: title,
        description: content,
        dueDate: '2023-10-12T22:00:55Z'
      },
      style: {cardTheme: '#2d9bf0'},
      geometry: {x: x, y: y, width: '320.0', height: '94.0', rotation: '0.0'}
    })
  };
  var response = new Promise(async function(resolve, reject){
    fetch('https://api.miro.com/v2/boards/' + id + '/cards', options)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        resolve(response);
    })
    .catch(err => {
        console.error(err)
        reject(err);
    });
  });
  return response;
}

async function createTextItem(id, content, [x, y] = [0, 0]){
    const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.key
        },
        body: JSON.stringify({
          data: {content: '<h1>' + content + '</h1>'},
          style: {
            backgroundOpacity: '0.0',
            borderWidth: "0.0",
            fontFamily: 'roboto_mono',
            textAlign: 'left',
            fontSize: "30",
          },
          geometry: {x: x, y: y, width: '250.0', rotation: '0'}
        })
      };
      console.log(options)
      var response = new Promise(async function(resolve, reject){
        fetch('https://api.miro.com/v2/boards/' + id + '/texts', options)
        .then(response => response.json())
        .then(response => {
            console.log(response.context);
            resolve(response);
        })
        .catch(err => {
            console.error(err)
            reject(err);
        });
      });
      return response;
}

async function updateCardItem(){
    const options = {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/vnd+miro.widgets.card+json',
          Authorization: 'Bearer ' + token.key
        },
        body: '{"data":{"title":"sample card item","description":"sample card description","dueDate":"2023-10-12T22:00:55Z"},"style":{"cardTheme":"#2d9bf0"}}'
      };
      
      fetch('https://api.miro.com/v2/boards/board_id/cards/card_item_id', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

async function updateCardItemPos(){
    const options = {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.key
        },
        body: JSON.stringify({x: 0, y: 0})
      };
      
      fetch('https://api.miro.com/v2/boards/board_id/cards/card_item_id/position', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

async function createEmbedItem(){
    const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token.key
        },
        body: JSON.stringify({
          data: {url: 'https://www.youtube.com/watch?v=HlVSNEiFCBk'},
          geometry: {x: '0', y: '0'}
        })
      };
      
      fetch('https://api.miro.com/v2/boards/board_id/embeds', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}
exports.createBoard = createBoard;
exports.listBoardsAsTeam = listBoardsAsTeam;
exports.getBoard = getBoard;
exports.copyBoard = copyBoard;
exports.updateBoard = updateBoard;
exports.deleteBoard = deleteBoard;
exports.listBoardMembers = listBoardMembers;
exports.getBoardMember = getBoardMember;
exports.getItemOnBoard = getItemOnBoard;
exports.updateItemPosition = updateItemPosition;
exports.deleteItem = deleteItem;
exports.createCardItem = createCardItem;
exports.createTextItem = createTextItem;
exports.updateCardItem = updateCardItem;
exports.updateCardItemPos = updateCardItemPos;
exports.createEmbedItem = createEmbedItem;
exports.getItemsOnBoard = getItemsOnBoard;

/*
listBoardsAsTeam().then(res =>{
    console.log(res.data[0])
    var board = res.data[0]
    createCardItem(board.id, "Huutis mint", "vanamehe jäätis")
    console.log(JSON.stringify(res.data[0]))
})
*/
