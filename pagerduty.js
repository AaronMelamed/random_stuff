const PagerDuty = require('./node_modules/@pagerduty/pdjs/build/src/index');
const pdClient = PagerDuty.api({token: 'pLdJiz-xUNe-w-aAK62k', tokenType: 'token'});

//POST Team request
function CreateTeam(){
    pdClient.Post('/teams', 
    {data :{"team": {
        "type": "team",
        "name": "API Team",
        "description": "Team created via the API"}
    }})
    .then(({data}) => 
    {
        console.log(data);
            
        })
    .catch(console.error);
} 

//GET Team request
function GetTeams(){
    pdClient.get('/teams')
    .then(({resource}) => 
    {
        resource.forEach(team => {
            console.log(`Name: ${team['name']}; ID: ${team['id']}`);
            
        });
    })
    .catch(console.error);
}

//Create Escalation Policy
function CreateEscalationPolicy(){
    pdClient.post('/escalation_policies',
    {data: {"escalation_policy": {
        "type": "escalation_policy",
        "name": "API Escalation Policy",
        "escalation_rules": [
            {
                "escalation_delay_in_minutes": 10,
                "targets": [
                    {
                        "id": "P3CWY66",
                        "type": "schedule_reference"
                    }
                ]
            },
            {
                "escalation_delay_in_minutes": 10,
                "targets": [
                    {
                        "id": "PIHCDP2",
                        "type": "user_reference"
                    }
                ]
            }
        ],
        "num_loops": 3,
        "on_call_handoff_notifications": "always",
        "desccription": "Escalation Policy created via API."
    }

    }})
    .then(resource => {console.log(resource)})
    .catch(console.error);
}

//Create Service
function CreateService(){
    pdClient.post('/services',
    {data: {"service": {
        "type": "service",
        "name": "API Service",
        "description": "Service created using the API",
        "auto_resolve_timeout": 7200,
        "acknowledgement_timeout": 600,
        "status": "active",
        "escalation_policy": {
            "id": "P7Q6YWJ",
            "type": "escalation_policy_reference"
        }
    }
        
    }})
    .then(resource => {console.log(resource)})
    .catch(console.error);
}

//Create an Incident
function CreateIncident(){
    pdClient.post('/incidents', {data: {
        "incident": {
            "type": "incident",
            "title": "The server has gone supernova and taken the DB with it",
            "service": {
                'id': "PUP2KQS",
                "type": "service_reference"
            },
            "priority": {
                "id": "PX4AHVO",
                "type": "priority_reference"
            },
            "urgency": "high",
            "body": {
                "type": "incident_body",
                "details": "The DB server experience a criticality event and tempororialy went supernova, taking out a large metropolitan area in the process.  It's probably fine, just go jiggle the cords as per the SOP."
            },
            "escalation_policy": {
                "id": "P7Q6YWJ",
                "type": "escalation_policy_reference"
            }
        }
    }})
    .then(resource => {console.log(resource)})
    .catch(console.error);
}

//Get Log Entries for Incident

function GetLogEntries(){
    pdClient.get('/incidents/PHTL5E2/log_entries')
    .then(({response}) => {
            console.log(JSON.stringify(response.data));
        })
    .catch(console.error);
}

    module.exports.CreateTeam = CreateTeam;
    module.exports.GetTeams = GetTeams;
    module.exports.CreateEsc = CreateEscalationPolicy;
    module.exports.CreateService = CreateService;
    module.exports.CreateIncident = CreateIncident;
    module.exports.GetLogEntries = GetLogEntries;