package com.infosys.lostFoundApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.infosys.lostFoundApplication.bean.LostFoundUser;

public interface LostFoundUserRepository extends JpaRepository<LostFoundUser, String> {
	
	@Query("SELECT a FROM LostFoundUser a WHERE a.role = 'Student'")
	public List<LostFoundUser> getAllStudents();

}
