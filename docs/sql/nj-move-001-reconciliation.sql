-- NJ-MOVE-001 reconciliation (MoveTrustHub only). Do not print credentials.

select 'provider_state_authority_nj' as relation, count(*) as n
from provider_state_authority
where state_code = 'NJ'
union all
select 'state_hhg_source_coverage', count(*)
from state_hhg_source_coverage
where source_dataset = 'NJ_DCA_PMW'
union all
select 'state_hhg_regulatory_events', count(*)
from state_hhg_regulatory_events
where source_dataset = 'NJ_DCA_PMW'
union all
select 'state_hhg_monitoring_events', count(*)
from state_hhg_monitoring_events
where source_dataset = 'NJ_DCA_PMW';

select event_class, count(*)
from state_hhg_regulatory_events
where source_dataset = 'NJ_DCA_PMW'
group by 1
order by 1;

select count(*) as historical_alerts
from state_hhg_monitoring_events
where source_dataset = 'NJ_DCA_PMW'
  and alerted = true
  and baseline_only = false;

select count(*) as pw_published_as_mover
from provider_state_authority
where state_code = 'NJ'
  and authority_type = 'intrastate_public_warehouseman'
  and verification_state = 'VERIFIED';
