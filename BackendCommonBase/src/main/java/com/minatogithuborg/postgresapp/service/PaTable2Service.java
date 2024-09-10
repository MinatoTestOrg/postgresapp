package com.minatogithuborg.postgresapp.service;

import com.vs.rappit.base.acl.IPerimeterManager;
import com.minatogithuborg.postgresapp.base.service.PaTable2BaseService;
import com.minatogithuborg.postgresapp.model.PaTable2;
import com.minatogithuborg.postgresapp.service.PaTable2PerimeterImpl;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;


@Service("PaTable2")
public class PaTable2Service extends PaTable2BaseService<PaTable2> implements IPaTable2Service<PaTable2>{

		@Autowired
		private  PaTable2PerimeterImpl  patable2PerimeterImpl;

		public PaTable2Service(ChangelogService changelogService) {
		super(PaTable2.class);	
		setChangelogService(changelogService); 
		
	}
	
}