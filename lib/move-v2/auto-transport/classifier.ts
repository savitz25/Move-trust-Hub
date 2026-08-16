import { AUTO_RULE_VERSION,type AutoInput,type AutoResult } from './types';

const active=(status:string)=>status.trim().toUpperCase()==='ACTIVE';
const propertyCarrier=(type:string)=>/motor carrier of property \(except household goods\)/i.test(type)&&!/private/i.test(type);
const propertyBroker=(type:string)=>/broker of property \(except household goods\)/i.test(type);

export function classifyAutoTransport(input:AutoInput):AutoResult{
 const reasons:string[]=[];const conflicts:string[]=[];const keys=new Set<string>();
 if(!input.motorVehiclesCargoReported){return{providerId:input.providerId,vertical:'AUTO_TRANSPORT',relevance:'NOT_AUTO_RELEVANT',classification:null,ruleVersion:AUTO_RULE_VERSION,reasonCodes:['NO_OFFICIAL_MOTOR_VEHICLE_CARGO_SIGNAL'],conflicts:[],supportingSourceKeys:[]};}
 reasons.push('FMCSA_MOTOR_VEHICLES_CARGO_REPORTED');
 const carrierRows=input.authorities.filter(a=>propertyCarrier(a.type));const brokerRows=input.authorities.filter(a=>propertyBroker(a.type));carrierRows.concat(brokerRows).forEach(a=>keys.add(a.sourceRecordKey));
 const carrierActive=carrierRows.some(a=>active(a.status)&&(a.bipdRequired==null||a.bipdRequired===0||(a.bipdOnFile??0)>=a.bipdRequired));
 const bondEvidence=input.insuranceForms.some(f=>['84','85'].includes(f))||brokerRows.some(a=>a.bondOnFile===true);
 const brokerActive=brokerRows.some(a=>active(a.status))&&bondEvidence;
 if(input.censusStatus!=='A'){reasons.push('INACTIVE_USDOT');return{providerId:input.providerId,vertical:'AUTO_TRANSPORT',relevance:'AUTO_RELEVANT',classification:'AUTO_TRANSPORT_INACTIVE',ruleVersion:AUTO_RULE_VERSION,reasonCodes:reasons,conflicts,supportingSourceKeys:[...keys]};}
 if(input.currentSuspensionOrRevocation){conflicts.push('CURRENT_SUSPENSION_OR_REVOCATION');return{providerId:input.providerId,vertical:'AUTO_TRANSPORT',relevance:'AUTO_REVIEW',classification:'AUTO_TRANSPORT_REVIEW',ruleVersion:AUTO_RULE_VERSION,reasonCodes:reasons,conflicts,supportingSourceKeys:[...keys]};}
 if(brokerRows.some(a=>active(a.status))&&!bondEvidence)conflicts.push('BROKER_FINANCIAL_RESPONSIBILITY_MISSING');
 if(carrierActive&&brokerActive){reasons.push('ACTIVE_PROPERTY_CARRIER_AUTHORITY','ACTIVE_PROPERTY_BROKER_AUTHORITY','BROKER_BOND_OR_TRUST_REPORTED');return{providerId:input.providerId,vertical:'AUTO_TRANSPORT',relevance:'AUTO_RELEVANT',classification:'AUTO_TRANSPORT_DUAL_ROLE',ruleVersion:AUTO_RULE_VERSION,reasonCodes:reasons,conflicts,supportingSourceKeys:[...keys]};}
 if(carrierActive){reasons.push('ACTIVE_PROPERTY_CARRIER_AUTHORITY');return{providerId:input.providerId,vertical:'AUTO_TRANSPORT',relevance:'AUTO_RELEVANT',classification:'AUTO_TRANSPORT_CARRIER',ruleVersion:AUTO_RULE_VERSION,reasonCodes:reasons,conflicts,supportingSourceKeys:[...keys]};}
 if(brokerActive){reasons.push('ACTIVE_PROPERTY_BROKER_AUTHORITY','BROKER_BOND_OR_TRUST_REPORTED');return{providerId:input.providerId,vertical:'AUTO_TRANSPORT',relevance:'AUTO_RELEVANT',classification:'AUTO_TRANSPORT_BROKER',ruleVersion:AUTO_RULE_VERSION,reasonCodes:reasons,conflicts,supportingSourceKeys:[...keys]};}
 if(carrierRows.length||brokerRows.length||input.historicalAutoEvidence)reasons.push('HISTORICAL_OR_NONCURRENT_PROPERTY_ROLE');else reasons.push('NO_CURRENT_PROPERTY_AUTHORITY');
 return{providerId:input.providerId,vertical:'AUTO_TRANSPORT',relevance:'AUTO_REVIEW',classification:'AUTO_TRANSPORT_REVIEW',ruleVersion:AUTO_RULE_VERSION,reasonCodes:reasons,conflicts,supportingSourceKeys:[...keys]};
}

export function serviceRoleKey(providerId:string,vertical:string,ruleVersion:string){return`${providerId}:${vertical}:${ruleVersion}`;}
