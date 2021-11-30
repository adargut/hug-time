from flask import Flask, session
from flask_cors import CORS
from random import randint, choice

friends_graph={'adar':['amit', 'lia', 'daniel','yonatan', 'michal'], 'amit':['adar', 'hadar', 'ohad']}
current_user = None
app = Flask(__name__)
CORS(app)

@app.route('/api/is-hug-time/<user>')
def is_hug_time(user):
    res = {'is_hug_time': 'NO'}

    if user in friends_graph and friends_graph[user] and randint(0, 1) == 1:
        res = {
            'is_hug_time': 'YES',
            'friend_to_hug': choice(friends_graph[user])
        }
        
    app.logger.info('is-hug-time returning response=' + str(res))
    
    return res
    
@app.route('/api/authenticate/new-user/<user>') 
def register_user(user):
    if user in friends_graph: # TODO connect with mongoDB
        res = {'success': False}
    else:
        friends_graph[user] = []
        res = {'success': True}
        
@app.route('/api/add-friend-to-user/<user>/<friend>', methods=['PUT'])
def add_friend_to_user(user, friend):
    if user not in friends_graph: # TODO connect with mongoDB
        res = {'success': False}
    else:
        friends_graph[user].append(friend)
        res = {'success': True, 'friendAdded': friend}
    
    app.logger.info('add-friend-to-user returning response=' + str(res))
    
    return res

@app.route('/api/get-all-friends/<user>')
def get_all_friends(user):
    
    if user not in friends_graph:
        friends_graph[user] = []
        res = {'friends': ''}
    else:
        res = {'friends': ','.join(friends_graph[user])}
        
    app.logger.info('get-all-friends returning response=' + str(res))
    
    return res
