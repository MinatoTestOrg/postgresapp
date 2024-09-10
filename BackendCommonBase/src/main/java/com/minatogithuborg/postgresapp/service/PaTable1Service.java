package com.minatogithuborg.postgresapp.service;

import com.vs.rappit.base.acl.IPerimeterManager;
import com.minatogithuborg.postgresapp.base.service.PaTable1BaseService;
import com.minatogithuborg.postgresapp.model.PaTable1;
import com.minatogithuborg.postgresapp.service.PaTable1PerimeterImpl;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;


@Service("PaTable1")
public class PaTable1Service extends PaTable1BaseService<PaTable1> implements IPaTable1Service<PaTable1>{

		@Autowired
		private  PaTable1PerimeterImpl  patable1PerimeterImpl;

		public PaTable1Service(ChangelogService changelogService) {
		super(PaTable1.class);	
		setChangelogService(changelogService); 
		
	}
	
}