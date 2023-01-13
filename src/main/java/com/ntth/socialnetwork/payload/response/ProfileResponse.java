package com.ntth.socialnetwork.payload.response;

import java.sql.Date;

import com.ntth.socialnetwork.entity.Location;

public class ProfileResponse {

	private Long userProfileID;
	
	private String firstName;
	
	private String lastName;
	
	private Long gender;
	
	private Date dateOfBirth;
	
	private String avatar;
	
	private String background;
	
	private String about;
	
	private Date updateDate;
	
  
	private Long userID;
	
	
	private Location location;


	public Long getUserProfileID() {
		return userProfileID;
	}


	public void setUserProfileID(Long userProfileID) {
		this.userProfileID = userProfileID;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public Long getGender() {
		return gender;
	}


	public void setGender(Long gender) {
		this.gender = gender;
	}


	public Date getDateOfBirth() {
		return dateOfBirth;
	}


	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}


	public String getAvatar() {
		return avatar;
	}


	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}


	public String getBackground() {
		return background;
	}


	public void setBackground(String background) {
		this.background = background;
	}


	public String getAbout() {
		return about;
	}


	public void setAbout(String about) {
		this.about = about;
	}


	public Date getUpdateDate() {
		return updateDate;
	}


	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}


	public Long getUserID() {
		return userID;
	}


	public void setUserID(Long userID) {
		this.userID = userID;
	}


	public Location getLocation() {
		return location;
	}


	public void setLocation(Location location) {
		this.location = location;
	}


	public ProfileResponse(Long userProfileID, String firstName, String lastName, Long gender, Date dateOfBirth,
			String avatar, String background, String about, Date updateDate, Long userID, Location location) {
		super();
		this.userProfileID = userProfileID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.gender = gender;
		this.dateOfBirth = dateOfBirth;
		this.avatar = avatar;
		this.background = background;
		this.about = about;
		this.updateDate = updateDate;
		this.userID = userID;
		this.location = location;
	}


	public ProfileResponse() {
		super();
	}
	
	
}
