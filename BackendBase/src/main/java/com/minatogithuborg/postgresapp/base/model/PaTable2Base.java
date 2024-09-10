package com.minatogithuborg.postgresapp.base.model;
import com.vs.rappit.base.model.BaseJPAModel;
import com.vs.rappit.base.annotations.Table;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.Id;
import com.vs.rappit.base.annotations.Searchable;
import com.vs.rappit.base.annotations.NotBlank;
import com.vs.rappit.base.util.ValidationErrorConstants;
import jakarta.persistence.UniqueConstraint;


@Table(name="PaTable2", keys={"sid"})
@MappedSuperclass
@jakarta.persistence.Table(name = "PaTable2",
				uniqueConstraints = {
			@UniqueConstraint(name = "SIDUnique", columnNames = {"sid"} )})
public class PaTable2Base extends BaseJPAModel {

	@Id
	@NotBlank(message = ValidationErrorConstants.BLANK_VALUE)
	@Searchable(index = true)
	private String field1;
	@Searchable(index = false)
	private String field2;
	@Searchable(index = false)
	private String field3;

	public void setField1(String field1) {
		this.field1 = field1;
	}

	public String getField1() {
		return field1;
	}

	public void setField2(String field2) {
		this.field2 = field2;
	}

	public String getField2() {
		return field2;
	}

	public void setField3(String field3) {
		this.field3 = field3;
	}

	public String getField3() {
		return field3;
	}



}